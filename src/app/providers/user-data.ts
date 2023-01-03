import { Injectable } from '@angular/core';

@Injectable()


/**
 * Class UserData
 */
export class UserData 
{
	private _id:		string	= '';
	private _login:		string	= '';
	private _name:		string	= '';
	private _authToken:	string	= '';

	/**
	 *
	 */
	constructor()
	{}

	/******************************************************
	 * Getter / Setter
	 ******************************************************/
	get id():			string	{ return this._id; }
	get authToken():	string	{ return this._authToken; }
	get login():		string	{ return this._login; }
	get name():			string	{ return this._name; }


	set id(id)					{ this._id			= id; }
	set authToken(authToken)	{ this._authToken	= authToken; }
	set login(login)			{ this._login		= login; }
	set name(name)				{ this._name		= name; }

	
	/**
	 * Sauvegarde des infos user suite à une connexion
	 * Pour une connexion plus persistante, sauvegarder également les infos dans le store du navigateur
	 */
	public doLogin(user: any, token: any)
	{
		if (token && token.auth)
		{
			this.authToken 	= token.auth;
		}
		if (user && user.userId && user.name && user.login)
		{
			this.id 		= user.userId;
			this.name 		= user.name;
			this.login 		= user.login;
		}
	}
}

