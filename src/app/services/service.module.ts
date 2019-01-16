import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService, ModalService } from './service.index';
import { PersonService } from './person/person.service';
import { LoginGuardGuard } from './guard/login-guard.guard';
import { ReservaService } from './reserva/reserva.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[ UsuarioService, 
              PersonService, 
              LoginGuardGuard, 
              ReservaService,
              ModalService ]
})
export class ServiceModule { }
