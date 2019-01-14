import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { ServiceModule } from './services/service.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PagesModule } from './pages/pages.module';
import { APP_ROUTES } from './app.routes';
import { TokenInterceptorService, RequestInterceptorService } from './services/service.index';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

//Angular Material
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(localeEs);

@NgModule({
	declarations: [ AppComponent, PagesComponent, LoginComponent ],
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		HttpClientModule,
		FormsModule,
		SharedModule,
		ServiceModule,
		APP_ROUTES,
		PagesModule,
		MaterialModule,
		BrowserAnimationsModule
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptorService,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: RequestInterceptorService,
			multi: true
		},
		{ provide: LOCALE_ID, useValue: 'es' }
	],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
