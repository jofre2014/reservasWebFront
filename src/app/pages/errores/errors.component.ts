import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'wk-error',
	templateUrl: './errors.component.html',
	styleUrls: [ './errors.component.scss' ]
})
export class ErrorsComponent implements OnInit {
	routeParams;

	constructor(private activatedRoute: ActivatedRoute) {}

	ngOnInit() {
		this.routeParams = this.activatedRoute.snapshot.queryParams;
	}
}
