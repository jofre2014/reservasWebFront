import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Cupos } from 'src/app/models/cupos.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private urlEndPoint = 'http://localhost:8088/api/cupos';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor( private http: HttpClient) { }

  getCupos(fecha: string): Observable<Cupos[]>{
    return this.http.get<Cupos[]>(`${this.urlEndPoint}/${fecha}`).pipe(
    map(res => res as Cupos[])
    );
    
  }
  
}
