import { Component, ViewEncapsulation, Inject }				from '@angular/core';
import { FormControl,ReactiveFormsModule, FormGroup, FormBuilder, Validators }	from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog }         from '@angular/material/dialog';
import { ParticipantsHttpService }                          from '../../../../services/participantsHttp.service';
import { ParticipantRole }              					from '../../../../classes/project-participant';
import { ParticipantsData } 								from '../../../../providers/participants-data';
import * as htmlEncode										from 'js-htmlencode';


@Component({
	selector:		'add-participant-modal',
	encapsulation:	ViewEncapsulation.None,
	templateUrl:	'addParticipantModal.component.html',
	styleUrls:		['./addParticipantModal.component.scss']
})


/**
 * Petite imcomprehention, pour moi les 2 1er champs du formulaire sont sur la meme donnée.
 * Donc pour la 2eme j'ai mis le statut
 */
export class AddParticipantModalComponent
{
	public participantEmail:	string = '';
	public participantName:		string = '';
	public participantCompany:	string = '';
    public participantJobTitle:	string = '';
    public participantRole:		string = '';
    public participantAdress:	string = '';
    public participantStatut:	string = '';

    public roleSelected:	any = '';
    public statutSelected:	any = '';

	public errorMailAvailable: boolean = false;

	public formParticipant = this.fb.group(
		{
			email:		[this.formCtrlEmail],
			name:		[this.formCtrlName],
			company:	[this.formCtrlCompany],
			jobTitle:	[this.formCtrlJobTitle],
			role:       [this.formCtrlRole],
			adress:     [this.formCtrlAdress],
			statut:     [this.formCtrlstatut]
		});

		
	constructor(
		public dialogRef:                   MatDialogRef<AddParticipantModalComponent, any>,
		private participantsHttpService:    ParticipantsHttpService,
		private participantsData:			ParticipantsData,

		private fb: 					FormBuilder,
		public formCtrlEmail:			ReactiveFormsModule,
		public formCtrlAccountUser:		ReactiveFormsModule,
		public formCtrlName:			ReactiveFormsModule,
		public formCtrlCompany:      	ReactiveFormsModule,
		public formCtrlJobTitle:      	ReactiveFormsModule,
		public formCtrlRole:			ReactiveFormsModule,
		public formCtrlAdress:			ReactiveFormsModule,
		public formCtrlstatut:			ReactiveFormsModule,

		@Inject(MAT_DIALOG_DATA) public data: any)
	{ 
        this.formCtrlEmail		= new FormControl({value: this.participantEmail }, [Validators.required, Validators.email]);
		this.formCtrlName		= new FormControl({value: this.participantName});
		this.formCtrlCompany	= new FormControl(this.participantCompany);
        this.formCtrlJobTitle	= new FormControl(this.participantJobTitle);
        this.formCtrlRole		= new FormControl(this.participantRole);
        this.formCtrlAdress		= new FormControl(this.participantAdress);
        this.formCtrlstatut		= new FormControl(this.participantStatut);
	}


	/**
	 * Fermeture de la modale
	 */
	public cancel()
	{
		this.dialogRef.close(false);
	}


	/**
	 * Validation du formulaire, création de l'objet et envoie de la requete
	 */
	public validate()
	{

		if (this.participantEmail)
		{
			this.participantEmail = htmlEncode.htmlEncode(this.participantEmail);
		}

		if (this.participantName)
		{
			this.participantName = htmlEncode.htmlEncode(this.participantName);
		}

		if (this.participantCompany)
		{
			this.participantCompany = htmlEncode.htmlEncode(this.participantCompany);
		}

		if (this.participantJobTitle)
		{
			this.participantJobTitle = htmlEncode.htmlEncode(this.participantJobTitle);
		}

		if (this.participantRole)
		{
			this.participantRole = htmlEncode.htmlEncode(this.participantRole);
		}

		if (this.participantAdress)
		{
			this.participantAdress = htmlEncode.htmlEncode(this.participantAdress);
		}
		if (this.participantStatut)
		{
			this.participantStatut = htmlEncode.htmlEncode(this.participantStatut);
		}

		if (this.canValidateModal())
        {
			// Récupérer les data du formulaire pour l'ajout
			this.participantsHttpService.addParticipant(this.data.projectId, this.participantEmail ,this.participantName, this.participantCompany, this.participantJobTitle, ParticipantRole.ADMIN).subscribe((data:any) => 
			{
				if (data)
				{
					this.participantsData.addParticipant(data);
					this.dialogRef.close(true);
				}
				else
				{
					this.dialogRef.close(false);
				}
			});
		}
	}


	/**
	 * Permet de vérifier si l'utilisateur à bien renseigné tous les champs.
	 */
	public canValidateModal()
	{
		let result = true;
		
		if (!this.participantEmail 		|| this.participantEmail 	=== '' || 
			!this.participantName 		|| this.participantName 	=== '' || 
			!this.participantCompany 	|| this.participantCompany 	=== '' || 
			!this.participantRole 		|| this.participantRole 	=== '' || 
			!this.participantAdress 	|| this.participantAdress 	=== '' || 
			!this.participantStatut 	|| this.participantStatut 	=== '' ||
			this.formParticipant.controls['email'].errors				   ||
			!this.isMailFree(this.participantEmail))
		{
			result = false;
		}

		return result;
	}


	/**
	 * Permet de savoir si un USER est déjà présent avec son email.
	 * Il est préférable de passer par un ID
	 * @param control
	 */
	public isMailFree(email: string)
	{
		let bReturn: boolean = true;
		console.log('email', email);
		if (email)
		{
			const participant	= this.participantsData.getParticipantByMail(email);
			if(participant)
			{
				bReturn = false;
			}
		}
		console.log('bReturn', bReturn);

		return bReturn;
	}
}
