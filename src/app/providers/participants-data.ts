import { Injectable } 			from '@angular/core';
import { ProjectParticipant }	from '../classes/project-participant';


@Injectable()
export class ParticipantsData 
{

    private _participants: any[] = [];

	constructor()
	{

	}

	/******************************************************
	 * Getter / Setter
	 ******************************************************/
    get participants(): any[] { return this._participants; }

	set participants(participants) 
	{ 
		if (participants && participants.length > 0)
		{
			for (const participant of participants)
			{
				let oParticipant = ProjectParticipant.fromJsonObject(participant);
				this._participants.push(oParticipant);
			}
		}
	}


	/******************************************************
	 * Spécifique
	 ******************************************************/

	/**
	 * Retourne un participant à partir de son Email
	 * @param psEmail 
	 * @returns 
	 */
	getParticipantByMail(email: string): ProjectParticipant
	{
		let oReturn = null;
		if (email)
		{
			for (const participant of this._participants)
			{
				if (participant.email === email)
				{
					oReturn = participant;
				}
			}
		}

		return oReturn;
	}


	/**
	 * Retourne une liste de participant à partir du projectID
	 * @param pnProjectID 
	 * @param psOwnerMail 
	 * @returns 
	 */
	getParticipantsByProjectID(projectID: number, ownerMail: string): ProjectParticipant[]
	{
		let aoReturn = [];
		if (projectID)
		{
			for (const participant of this._participants)
			{
				if (participant.projectId === projectID && participant.email !== ownerMail)
				{
					aoReturn.push(participant);
				}
			}
		}

		return aoReturn;
	}



	/**
	 * Retourne une liste de participant à partir d'une société
	 * @param CompanyName 
	 * @param psOwnerMail 
	 * @returns 
	 */
	getParticipantsByCompany(companyName: string, ownerMail: string): ProjectParticipant[]
	{
		let aoReturn = [];
		if (companyName)
		{
			for (const participant of this._participants)
			{
				if (participant.company === companyName && participant.email !== ownerMail)
				{
					aoReturn.push(participant);
				}
			}
		}

		return aoReturn;
	}


	/**
	 * Ajoute un participant à la liste
	 * @param jsonParticipant 
	 */
	public addParticipant(jsonParticipant:any)
	{
		const newParticipant = ProjectParticipant.fromJsonObject(jsonParticipant);

		if (newParticipant)
		{
			// Test si l'utilisateur existe déjà
			const testPresence = this.getParticipantByMail(newParticipant.email);
			if (testPresence === null)
			{
				this._participants.push(newParticipant);
			}
		}
	}
}
