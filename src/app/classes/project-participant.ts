import { ParticipantRole, ParticipantInvitationState } from "./archipad-mock"
/**
 * 
 * @export
 * @class User
 */
export class ProjectParticipantClass
{
	private _email:     string						= '';
	private _name:      string						= '';
	private _company:	string						= '';
	private _jobTitle:	string						= '';
	private _projectId: number						= 0;
	private _role:      ParticipantRole				= ParticipantRole.OWNER;
	private _state:     ParticipantInvitationState	= ParticipantInvitationState.PENDING;


	/**
	 * @static
	 * @param {any} jsonObj
	 * @returns {ProjectParticipant}
	 * 
	 * @memberOf User
	 */
	public static fromJsonObject(jsonObj: any): ProjectParticipantClass
	{
		let result = new ProjectParticipantClass();

		result._email       = jsonObj.email		? jsonObj.email		: '';
		result._name        = jsonObj.name		? jsonObj.name		: '';
		result._company		= jsonObj.company	? jsonObj.company	: '';
		result._jobTitle	= jsonObj.jobTitle	? jsonObj.jobTitle	: '';
		result._projectId	= jsonObj.projectId	? jsonObj.projectId	: 0;
		result._role        = jsonObj.role		? jsonObj.role		: null;
		result._state       = jsonObj.state		? jsonObj.state		: null;

		return result;
	}


	/**
	 * Creates an instance of Participant.
		 */
	constructor(){ }


	get email():		string						{ return this._email; }
	get name():			string						{ return this._name; }
	get company():		string						{ return this._company; }
	get jobTitle():		string						{ return this._jobTitle; }
	get projectId():	number						{ return this._projectId; }
	get role():			ParticipantRole				{ return this._role; }
	get state():		ParticipantInvitationState	{ return this._state; }


	set email(email)            { this._email		= email; }
	set name(name)              { this._name		= name; }
	set company(company)		{ this._company		= company; }
	set jobTitle(jobTitle)		{ this._jobTitle	= jobTitle; }
	set projectId(projectId)	{ this._projectId	= projectId; }
	set role(role)              { this._role		= role; }
	set state(state)            { this._state		= state; }


	/**
	 * 
	 */
	public toJson()
	{
		let result = 
		{
			email:		this.email,
			name:		this.name,
			company:	this.company,
			jobTitle:	this.jobTitle,
			projectId:	this.projectId,
			role:		this.role,
			state:		this.state
		};

		return result;
	}


}

