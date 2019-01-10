import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from './service.index';
import { PersonService } from './person/person.service';
import { LoginGuardGuard } from './guard/login-guard.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[ UsuarioService, PersonService, LoginGuardGuard ]
})
export class ServiceModule { }
