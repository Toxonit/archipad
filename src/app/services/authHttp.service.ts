
import { Injectable }				from '@angular/core';
import { HttpClient, HttpHeaders }	from '@angular/common/http';
import {Observable} 				from 'rxjs';
import { HttpService }				from './http.service';

@Injectable()


/**
 * Classe de gestion des connexions
 */
export class AuthHttpService
{

	/**
	 * 
	 */
	constructor(private http: HttpClient)
	{
	}


	/**
	 * Construction et envoi de la requette de connexion au serveur
	 */
	public doLogin(username: string, password: string): Observable<any>
	{
		let headers = new HttpHeaders(
		{
			"Access-Control-Allow-Headers":
			  "Content-Type, Authorization, Content-Length, X-Requested-With",
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "application/json"
		});

		// Création d'un post pour demander un login.
		let credentials =
		{
			username:		username,
			password:		password
		};

		let apiUrl			= HttpService.getAPIUrl();
		let path			= HttpService.getPathByWebServiceName('login');
		let url 			= apiUrl + path
		let jSonCredential	= JSON.stringify(credentials);

		// POST de la requette
		return this.http.post(url, jSonCredential, { headers: headers });
	}
}
