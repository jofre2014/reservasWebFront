import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError  } from 'rxjs/operators';
import swal from 'sweetalert';
import { of } from 'rxjs/internal/observable/of';


@Injectable()
export class UsuarioService {  
  
  usuario: Usuario;
  token: string;

  urlBackend =  environment.urlBackend;

  constructor( private http: HttpClient,
               private router: Router  ) {    
    this.cargarStorage();
   }

   guardarStorage( token: string, usuario: Usuario, nombreFantasia="" ) {

    usuario.nombreFantasia = nombreFantasia;     
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify( usuario ) );    

    this.usuario = usuario;
    this.token = token;    
  }

  logout() {
    
    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'usuario' );

    this.usuario = null;
    this.token = '';   

    this.router.navigate(['/login']);
  }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
    if ( localStorage.getItem('token') ) {
        this.token = localStorage.getItem('token');    
        console.log( localStorage.getItem('usuario') );    
        this.usuario = JSON.parse( localStorage.getItem('usuario') );               
    } else {
        this.token = '';
        this.usuario = null;        
    }
  }

  
  loginNormal$( usuario: Usuario, recuerdarme: boolean = false ) {
    const url = this.urlBackend + '/api/login';

    if ( recuerdarme ) {
        //localStorage.setItem('email', usuario.email );
    } else {
        //localStorage.removeItem('email' );
    }

    return this.http.post( url, usuario )
      .pipe(
        map ( ( resp: any ) => {

          this.guardarStorage( resp.token, resp.usuario, resp.nombreFantasia);          
          return true;
        })
        ,catchError( err => {
          swal('Error en el login', err.error.mensaje, 'error');
           return of(`Bad Promise: ${err}`)           
        })
      );
  }

  loginGoogle$( token ) {

    const url = this.urlBackend + '/login/google';

    return  this.http.post( url, {token} )
            .pipe( map( ( resp: any ) =>  {
                        this.guardarStorage( resp.token, resp.usuario );
                        return true;
                      })
            );
  } 

  /*
  crearUsuario$( usuario: Usuario ) {

    const url = this.urlBackend + '/usuario';
    return this.http.post( url, usuario )
    .pipe( map(  ( resp: any) => {
        swal('Usuario Creado', usuario.email, 'success');
        return resp.usuario;
    }));
  }
  
  */
  

}
