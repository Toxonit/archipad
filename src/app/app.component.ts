import { Component } 				from '@angular/core';
import { HttpClient } 				from '@angular/common/http';
import { Router, NavigationEnd }	from '@angular/router';
import { UserData } 				from './providers/user-data';


@Component(
{
	selector: 		'app-root',
	templateUrl: 	'./app.component.html',
	styleUrls: 		['./app.component.scss']
})


export class AppComponent
{
	public title:			string	= 'ArchiPad';
	public inLoginPanel: 	boolean = false;

	
	constructor(
		private http: 	HttpClient,
		public 	router:	Router,
		public  userData: UserData) 
	{

		// ---------------------------------------
		// Gestion des chargements des routes
		// Pour une connexion persistante = sauvegarder dans le store l'état de connexion et les infos (dans user-data)
		// Rajouter un bouton déconnexion pour clear les datas et déco
		// ---------------------------------------
		router.events.subscribe((val) =>
		{	
			if (val instanceof NavigationEnd)
			{
				this.inLoginPanel = val && (val.url === '/login' || val.url === '/');

				// On est pas sur la page de login
				if (!this.inLoginPanel)
				{
					// on est pas connecté (oui c'est bof^^ mais dans un cas réel le test serait plus poussé)
					if (this.userData.authToken === null || this.userData.authToken === '')
					{
						// Si on est pas dans le login et que des validations ne sont pas faite on est redirigé vers le login
						this.router.navigate(['/login']);
					}
					// On est pas le login et connecté, on va vérifier la présence de data et si non les demander
					else
					{
						//TODO
					}
				}
				// On est sur login
				else
				{
					//  connecté, donc on redirige sur la page "project", normalement ça serait la home
					if (this.userData.authToken !== null &&  this.userData.authToken !== '')
					{
						this.router.navigate(['/project']);
					}
				}
			}
		});
	}
}
