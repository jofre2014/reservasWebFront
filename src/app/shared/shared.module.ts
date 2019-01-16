import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { PlaceHolderComponent } from './modal/place.holder.component';
import { EjemploModalComponent } from './ejemplo-modal/ejemplo-modal.component';
import { AddComponenteDirective } from './modal/add.componente.directive';

@NgModule({
  declarations: [
                  NoPageFoundComponent, 
                  HeaderComponent,
                  PlaceHolderComponent,
                  EjemploModalComponent,
                  AddComponenteDirective
                ],
  imports: [
    CommonModule, RouterModule
  ],
  exports:[ 
            NoPageFoundComponent,
            HeaderComponent,
            PlaceHolderComponent,
            EjemploModalComponent,
            AddComponenteDirective
          ],
  entryComponents: [ EjemploModalComponent ]       
})
export class SharedModule { }
