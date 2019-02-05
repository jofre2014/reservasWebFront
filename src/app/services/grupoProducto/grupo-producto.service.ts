import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class GrupoProductoService {
	url = environment.urlBackend;
	constructor(private http: HttpClient) {}

	getGrupoXProducto(productoId: number): Observable<any> {
		return this.http.get(`${this.url}/api/grupoProductos/${productoId}`);
	}
}
