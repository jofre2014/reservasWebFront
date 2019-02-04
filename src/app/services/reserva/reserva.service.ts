import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { Cupos } from 'src/app/models/cupos.model';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import swal from 'sweetalert';

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

	generarReserva(reservas: any[]): Observable<any> {
		console.log('Servicio Generar Reserva: ', reservas);
		const url = this.urlBackend + '/api/reservas';
		return this.http.post<any>(url, reservas, { headers: this.httpHeaders }).pipe(
			map(
				(res) =>
					res == true
						? swal('Reserva', 'Reserva Generada!', 'success')
						: swal('Reserva', 'No se puedo generar la reserva.', 'error')
			),
			catchError((err) => {
				swal('Error reserva', err.error.mensaje, 'error');
				return of(`Bad Promise: ${err}`);
			})
		);
	}
}
