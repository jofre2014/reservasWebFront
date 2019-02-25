import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { Cupos } from 'src/app/dto/cupos.dto';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import swal from 'sweetalert';
import { Reserva } from 'src/app/models/reserva.model';

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
				return of(`error: ${err}`);
			})
		);
	}

	listarReservasEstadoConfir(cliente, estado, page): Observable<any[]> {
		return this.http
			.get<any[]>(`${this.urlBackend}/api/reservas/confirmadas/${cliente}/${estado}/${page}`)
			.pipe(map((response: any) => response));
	}

	confirmarReserva(reservaId: number): Observable<any> {
		const url = `${this.urlBackend}/api/reservas/confirmarReserva`;
		return this.http.put(`${url}/${reservaId}`, { headers: this.httpHeaders }).pipe(
			map((res) => {
				res == true
					? swal('Reserva', 'Reserva Confirmada!', 'success')
					: swal('Reserva', 'No se puedo confirmar la reserva.', 'error');
			}),
			catchError((e) => {
				swal('Error', e.error.mensaje, 'error');

				return throwError(e);
			})
		);
	}

	getReservaPaxs(idReserva: number): Observable<any> {
		const url = `${this.urlBackend}/api/reservas/reservaPaxs/${idReserva}`;
		return this.http.get(url);
	}
}
