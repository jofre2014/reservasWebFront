import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NoPageFoundComponent, HeaderComponent],
  imports: [
    CommonModule, RouterModule
  ],
  exports:[ NoPageFoundComponent, HeaderComponent ]
})
export class SharedModule { }
