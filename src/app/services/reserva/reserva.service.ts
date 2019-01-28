import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Cupos } from 'src/app/models/cupos.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
	providedIn: 'root'
})
export class ReservaService {
	//private urlEndPoint = 'http://localhost:8088/api/cupos';
	urlBackend = environment.urlBackend;

	private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

	constructor(private http: HttpClient) {}

	getCupos(fecha: string): Observable<Cupos[]> {
		const url = this.urlBackend + '/api/cupos';
		return this.http.get<Cupos[]>(`${url}/${fecha}`).pipe(map((res) => res as Cupos[]));
	}

	getBuscarReservas(textoABuscar: string, confirmada: boolean, campo: string) {
		textoABuscar = textoABuscar.toLowerCase();
	}
}
