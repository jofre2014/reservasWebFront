import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService, PersonService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';

//declare const gapi: any;

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styles: []
})
export class LoginComponent implements OnInit {
	username: string;
	password: string;
	recuerdame: boolean = false;

	auth2: any;

	constructor(private _router: Router, public _us: UsuarioService, public _ps: PersonService) {}

	ngOnInit() {
		//this.googleInit();
		this.username = localStorage.getItem('username') || '';
		if (this.username.length > 0) {
			this.recuerdame = true;
		}
	}

	ingresar(forma: NgForm) {
		if (forma.valid) {
			const usuario = new Usuario(forma.value.username, forma.value.password);

			this._us
				.loginNormal$(usuario, forma.value.recuerdame)
				.subscribe((correcto) => this._router.navigate([ '/reservas' ]));
		}
	}

	/*googleInit(){

    gapi.load( 'auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '731382486779-6brb9g844ki4pmvcoh4fd8v6c3e9afg4.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle'));


    });
  }

  attachSignin( element ){

    this.auth2.attachClickHandler( element, {}, (googleUser) => {
        //let profile = googleUser.getBasicProfile();
        //console.log( profile );

        let token = googleUser.getAuthResponse().id_token;
        this.ingresarGoogle( token );
    });
  }
  
  
  ingresarGoogle( token ) {
      this._us.loginGoogle$(  token )
      .subscribe( correcto =>  window.location.href = '#/wellcome' );
    }

  */
}
