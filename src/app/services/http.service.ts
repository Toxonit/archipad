import { Injectable } 	from '@angular/core';
import { HttpClient }	from '@angular/common/http';


@Injectable()


export class HttpService
{
	// a aller chercher dans un fichier de conf si on veut prod preprod local
	private static apiUrl: string	= 'http://localhost:3000';

	
	/**
	 *  Retourne l'url de l'api 
	 */
	public static getAPIUrl(): string
	{
		return HttpService.apiUrl;
	}


	/**
	 * Retourne l'url du service dans l'api
	 */
	public static getPathByWebServiceName(name: string)
	{
		let sReturn = '';

		switch (name)
		{
			case 'login':
				sReturn += '/api/login/';
				break;

			case 'users':
				sReturn += '/api/users/';
				break;

			case 'adduser':
				sReturn += '/api/adduser/';
				break;
		}

		return sReturn;
	}
}
