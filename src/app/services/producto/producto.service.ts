import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ProductoService {
	urlBackend = environment.urlBackend;

	constructor(private http: HttpClient) {}

	getListaProductos() {
		const url = this.urlBackend + '/api/productosInternet';
		return this.http.get(url);
	}
}
