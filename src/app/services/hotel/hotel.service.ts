import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class HotelService {
	url = environment.urlBackend;

	constructor(private http: HttpClient) {}

	getHoteles(traslado: number, ptoEncuentro: number) {
		return this.http.get(`${this.url}/api/hoteles/${traslado}/${ptoEncuentro}`);
	}
}
