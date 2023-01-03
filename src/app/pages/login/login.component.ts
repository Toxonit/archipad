import { Component }		 		from '@angular/core';
import * as htmlEncode 				from 'js-htmlencode';
import { Router }					from '@angular/router';
import { HttpClient } 				from '@angular/common/http';
import { AuthHttpService }			from '../../services/authHttp.service';
import { ParticipantsHttpService } 	from '../../services/participantsHttp.service';
import { UserData }					from '../../providers/user-data';
import { ParticipantsData }			from '../../providers/participants-data';



@Component(
{
	selector: 		'app-login',
	templateUrl: 	'./login.component.html',
	styleUrls:		['./login.component.scss']
})


/**
 * Composant de connexion
 */
export class LoginComponent
{
	public username:	string = '';
	public password:	string = '';

	constructor(
		private authHttpService: 			AuthHttpService, 
		private participantsHttpService: 	ParticipantsHttpService, 
		private userData: 					UserData,
		private participantsData: 			ParticipantsData,
		private router: 					Router,
		private moHttp: 					HttpClient
		)
	{ }


	public login()
	{
		let username = htmlEncode.htmlEncode(this.username);
		let password = htmlEncode.htmlEncode(this.password);


		// ---------------------------------------
		// POST de la requette de connexion, si ok on redirige vers la page + sauvegarde des infos 
		// ---------------------------------------
		this.authHttpService.doLogin(username, password).subscribe((res) =>
		{
			if (res.user && res.authToken)
			{
				this.userData.doLogin(res.user, res.authToken);

				// récupération des participants pour la page suivante
				this.participantsHttpService.getParticipants().subscribe((data:any) => 
				{
					if (data)
					{
						// Une fois loggé et reception des datas on redirige
						this.participantsData.participants = data;
						this.router.navigate(['/project']);
					}
				});
			}
		}, (err) =>
		{
			// ---------------------------------------
			// Ajouter la gestion d'erreur + affichage user
			//  ---------------------------------------
		});
	}

}
