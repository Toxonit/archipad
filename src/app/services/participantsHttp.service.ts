
import { Injectable }				from '@angular/core';
import { HttpClient, HttpHeaders }	from '@angular/common/http';
import { Observable } 				from 'rxjs';
import { HttpService }				from './http.service';
import { UserData } 				from '../providers/user-data';
import { ParticipantRole } 			from '../classes/project-participant';

@Injectable()


/**
 * Classe de gestion des connexions
 */
export class ParticipantsHttpService
{
	/**
	 * 
	 */
	constructor(
		private http: 		HttpClient, 
		private userData: 	UserData
		)
	{

	}


	/**
	 * Construction et envoi de la requette de connexion au serveur
	 */
	public getParticipants(): Observable<any>
	{
		let headers = new HttpHeaders(
		{
			"Access-Control-Allow-Headers":
			  "Content-Type, Authorization, Content-Length, X-Requested-With",
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "application/json"
		});

		// Création d'un post pour demander la liste des participants
		let body =
		{
			authToken:		this.userData.authToken,
		};

		let apiUrl	= HttpService.getAPIUrl();
		let path	= HttpService.getPathByWebServiceName('users');
		let url 	= apiUrl + path

		// POST de la requette 	
		return this.http.get(url, { headers: headers, params: body} );
	}

	
	/**
	 * Construction et envoi de la requette de connexion au serveur
	 */
	public addParticipant(projectId: number, email: string, name: string, company: string, jobTitle: string, role: ParticipantRole): Observable<any>
	{
		let headers = new HttpHeaders(
		{
			"Access-Control-Allow-Headers":
			  "Content-Type, Authorization, Content-Length, X-Requested-With",
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "application/json"
		});

		let body =
		{
			authToken:	this.userData.authToken,
			projectId: 	projectId,
			email: 		email,
			name: 		name,
			company: 	company,
			jobTitle: 	jobTitle,
			role: 		role

		};

		let apiUrl		= HttpService.getAPIUrl();
		let path		= HttpService.getPathByWebServiceName('adduser');
		let url 		= apiUrl + path
		let jSonBody	= JSON.stringify(body);

		// POST de la requette 	
		return this.http.post(url, body, { headers: headers, } );
	}

}
