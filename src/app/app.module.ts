import { NgModule }         					from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA }				from '@angular/core';
import { BrowserModule }    					from '@angular/platform-browser';
import { HttpClientModule } 					from '@angular/common/http';
import { AppComponent }     					from './app.component';
import { Routes, RouterModule }					from '@angular/router';
import { BrowserAnimationsModule }				from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } 	from '@angular/forms';

import { MatButtonModule } 		from '@angular/material/button';
import { MatInputModule } 		from '@angular/material/input';
import { MatFormFieldModule } 	from '@angular/material/form-field';
import { MatTableModule } 		from '@angular/material/table';
import { MatIconModule } 		from '@angular/material/icon';
import { MatDialogModule } 		from '@angular/material/dialog';
import { MatSelectModule } 		from '@angular/material/select';

import { LoginComponent }				from './pages/login/login.component';
import { ProjectComponent }				from './pages/project/project.component';
import { AddParticipantModalComponent }	from './pages/project/modals/add-participant/addParticipantModal.component';

import { UserData }					from './providers/user-data';
import { ParticipantsData }			from './providers/participants-data';
import { AuthHttpService }			from './services/authHttp.service';
import { HttpService }				from './services/http.service';
import { ParticipantsHttpService } 	from './services/participantsHttp.service';


export const routes: Routes = 
[
	{ path: '',			component: LoginComponent },
	{ path: 'login',	component: LoginComponent },
	{ path: 'project',	component: ProjectComponent },
];


@NgModule(
{
	declarations: 
	[
		AppComponent,
		LoginComponent,
		ProjectComponent,
		AddParticipantModalComponent,
	],
	imports: 
	[
		BrowserModule,
		HttpClientModule,
		RouterModule.forRoot(routes),
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatInputModule,
		MatFormFieldModule,
		MatTableModule,
		MatIconModule,
		MatDialogModule,
		MatSelectModule,
	],
	providers: 
	[
		UserData, 
		ParticipantsData, 
		AuthHttpService, 
		HttpService,
		ParticipantsHttpService
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	bootstrap: [AppComponent]
})
export class AppModule { }
