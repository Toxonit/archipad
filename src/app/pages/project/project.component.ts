import { Component, ViewEncapsulation }			from '@angular/core';
import { Observable, of } 						from 'rxjs';
import { DataSource }							from '@angular/cdk/collections';
import { AddParticipantModalComponent }			from './modals/add-participant/addParticipantModal.component'
import { UserData }								from '../../providers/user-data';
import { ParticipantsData }						from '../../providers/participants-data';
import { MatDialog } 							from '@angular/material/dialog';

import { ProjectParticipant, ParticipantRole, ParticipantInvitationState }	from '../../classes/project-participant';


@Component({
	selector:     'app-project',
	templateUrl:  './project.component.html',
	styleUrls:    ['./project.component.scss'],
	encapsulation:	ViewEncapsulation.None,
})


export class ProjectComponent
{
	public displayedColumns:			string[]	= ['email', 'name','company', 'state','role', 'actions'];
	public displayedColumnsArchipad:	string[]	= ['jobTitle', 'email','name', 'company', 'state', 'actions'];
	
	public currentUser:			  			any;
	public dataSourceCurrentUser: 			any;

	public sharedParticipant:				any;
	public dataSourceSharedParticipant: 	any;

	public ArchipadParticipant:				any;
	public dataSourceArchipadParticipant: 	any;


	/**
	 * 
	 */
	constructor(
		private userData: 			UserData,
		private participantsData: 	ParticipantsData,
		public  dialog: 			MatDialog) 
	{ 
		if (this.userData.login)
		{
			// Récupération de l'utilisateur en cours à partir du mail
			this.currentUser = this.participantsData.getParticipantByMail(this.userData.login);
			// Génération du premier tableau
			if (this.currentUser)
			{
				this.dataSourceCurrentUser = new ItemDataSource([this.currentUser]);

				// Récupération des participants qui ont le projet, sauf le propriétaire
				if (this.currentUser.projectId)
				{
					this.sharedParticipant = this.participantsData.getParticipantsByProjectID(this.currentUser.projectId, this.currentUser.email);
					// Génération du tableau des participants partagés
					if (this.sharedParticipant && this.sharedParticipant.length > 0)
					{
						this.dataSourceSharedParticipant = new ItemDataSource(this.sharedParticipant);
					}
				}

				// Récupération des participants archipad
				if (this.currentUser.projectId)
				{
					this.ArchipadParticipant = this.participantsData.getParticipantsByCompany('Archipad', this.currentUser.email);
					// Génération du tableau participants Archipad
					if (this.ArchipadParticipant && this.ArchipadParticipant.length > 0)
					{
						this.dataSourceArchipadParticipant = new ItemDataSource(this.ArchipadParticipant);
					}
				}
			}
		}
	}


	public enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] 
	{
		return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[];
	}


	/**
	 * Ouvre la modale de partage de projet
	 */
	public addShare()
	{
		// Récupération des énums pour les rendre digestion par un mat select
		let aStateValue	= [];
		let aStateView 	= [];
		let aState 		= [];

		let aRoleValue 	= [];
		let aRoleView 	= [];
		let aRole 		= [];


		/**************************************
		 * STATUT
		 **************************************/
		for (let role in ParticipantInvitationState)
		{
			aStateValue.push(role);
		}
		for (const role of this.enumKeys(ParticipantInvitationState)) 
		{
			aStateView.push(ParticipantInvitationState[role]);
		}
		// Construction du tableau
		for (let index in aStateValue)
		{
			let tempJson = {value : aStateValue[index], view:  aStateView[index]}
			aState.push(tempJson);
		}

		/**************************************
		 * Role
		 **************************************/
		for (let role in ParticipantRole)
		{
			aRoleValue.push(role);
		}
		for (const role of this.enumKeys(ParticipantRole)) 
		{
			aRoleView.push(ParticipantRole[role]);
		}
		// Construction du tableau
		for (let index in aRoleValue)
		{
			let tempJson = {value: aRoleValue[index], view:  aRoleView[index]}
			aRole.push(tempJson);
		}

		// Ouverture de la modale
		const dialogRef = this.dialog.open(AddParticipantModalComponent,
		{
			height:			'95%',
			width:			'800px',
			panelClass:		'responsive_modal',
			disableClose:	true,
			data:
			{
				role: 		aRole,
				state: 		aState,
				projectId: 	this.currentUser.projectId
			}
		});

		// A la fermeture de la modale
		dialogRef.afterClosed().subscribe((result: any) =>
		{
			if (result)
			{
				// rappel de la liste
				this.sharedParticipant = this.participantsData.getParticipantsByProjectID(this.currentUser.projectId, this.currentUser.email);
				if (this.sharedParticipant && this.sharedParticipant.length > 0)
				{
					this.dataSourceSharedParticipant = new ItemDataSource(this.sharedParticipant);
				}
			}
		});
	}
}


/**
 * Classe utilisé pour peupler le mat tab
 */
export class ItemDataSource extends DataSource<any>
{
    public objParticipant: any;

	constructor(objParticipant: any)
	{
		super();
        this.objParticipant = objParticipant;
	}


	/** Connect function called by the table to retrieve one stream containing the data to render. */
	connect(): Observable<ProjectParticipant[]>
	{
		return of(this.objParticipant);
	}

	disconnect() { }
}
