'use strict';

import jsonServer from 'json-server';
const middleware 	= jsonServer.defaults();
const server 		= jsonServer.create();

server.use(middleware);
server.use(jsonServer.bodyParser);

import * as Project from './data/users/index.js';


server.listen(3000, () => 
{
	console.log('JSON server listening on port 3000');
});


/**
 * Login
 */
server.post('/api/login', (req:any, res:any, next:any) => 
{
	const userService = new Project.UserService();

	return new Promise((resolve, reject) =>
	{
		userService.login(req.body.username, req.body.password).then((data:any) => 
		{
				console.log('data',data);
				res.status(200).send(data);
				resolve(true);
		});
	});
});


/**
 * Récupération de la liste des participants
 */
server.get('/api/users', (req:any, res:any, next:any) => 
{
	const projectParticipantService = new Project.ProjectParticipantService();
	return new Promise((resolve, reject) =>
	{
		projectParticipantService.getParticipants(req.query.authToken, 0).then((data:any) => 
		{
				console.log('data',data);
				res.status(200).send(data);
				resolve(true);
		});
	});
});


/**
 * Ajout d'un participant
 */
server.post('/api/adduser', (req:any, res:any, next:any) => 
{
	const projectParticipantService = new Project.ProjectParticipantService();
	//res.status(200).send(projectParticipantService.addParticipant(req.body.authToken,req.body.projectId, req.body.email, req.body.name, req.body.company, req.body.jobTitle, req.body.role ));

	return new Promise((resolve, reject) =>
	{
		projectParticipantService.addParticipant(req.body.authToken,req.body.projectId, req.body.email, req.body.name, req.body.company, req.body.jobTitle, req.body.role).then((data:any) => 
		{
			res.status(200).send(data);
			resolve(true);
		});
	});
});