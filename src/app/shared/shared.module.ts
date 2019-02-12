import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { PlaceHolderComponent } from './modal/place.holder.component';
import { EjemploModalComponent } from './ejemplo-modal/ejemplo-modal.component';
import { AddComponenteDirective } from './modal/add.componente.directive';
import { PaginatorComponent } from './paginator/paginator/paginator.component';

@NgModule({
	declarations: [
		NoPageFoundComponent,
		HeaderComponent,
		PlaceHolderComponent,
		EjemploModalComponent,
		AddComponenteDirective,
		PaginatorComponent
	],
	imports: [ CommonModule, RouterModule ],
	exports: [
		NoPageFoundComponent,
		HeaderComponent,
		PlaceHolderComponent,
		EjemploModalComponent,
		AddComponenteDirective,
		PaginatorComponent
	],
	entryComponents: [ EjemploModalComponent ]
})
export class SharedModule {}
