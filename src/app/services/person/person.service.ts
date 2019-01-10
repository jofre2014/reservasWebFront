import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class PersonService {

  urlBackend =  environment.urlBackend;
  constructor( private http: HttpClient ) { }

  getListaPerson$() {
      const url = this.urlBackend + "/api/personas";
      return this.http.get( url );
  }
}
