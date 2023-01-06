import { Component }		 		from '@angular/core';
import * as htmlEncode 				from 'js-htmlencode';
import { Router }					from '@angular/router';
import { HttpClient } 				from '@angular/common/http';
import { UserData }					from '../../providers/user-data';
import { ParticipantsData }			from '../../providers/participants-data';
import { UserService, ProjectParticipantService }				from '../../classes/archipad-mock';


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
		private userData: 					UserData,
		private participantsData: 			ParticipantsData,
		private router: 					Router,
		private userService: 				UserService,
		private projectParticipant: 		ProjectParticipantService,
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

		this.userService.login(username, password).then(result =>
		{
			if (result.user && result.authToken)
			{
				this.userData.doLogin(result.user, result.authToken);

				// récupération des participants pour la page suivante
				this.projectParticipant.getParticipants(result.authToken, 1).then((data:any) => 
				{
					if (data)
					{
						// Une fois loggé et reception des datas on redirige
						this.participantsData.participants = data;
						this.router.navigate(['/project']);
					}
				});
			}
		});
	}

}
