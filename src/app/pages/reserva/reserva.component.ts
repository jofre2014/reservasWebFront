import { Component, OnInit, NgModule } from '@angular/core';
import { Voucher } from 'src/app/models/voucher.model';
import { VOUCHER } from 'src/app/models/voucher.json';
import { ReservaService } from 'src/app/services/reserva/reserva.service';
import { Cupos } from 'src/app/models/cupos.model';


@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styles: []
})
export class ReservaComponent implements OnInit {

  voucher: Voucher[] = VOUCHER; 
  cupos: Cupos[] = []//[{nombreServicio: 'spa', cantidadCupo:2},
                      //{nombreServicio: 'parque', cantidadCupo:5}];
  cup: any[] = [];
  constructor( private reservaService: ReservaService) { }

  ngOnInit() {

    console.log("Voucher: ", this.voucher);
  
    this.reservaService.getCupos("2019-03-25").subscribe(
      cuposDevueltos => {
        
        this.cupos = cuposDevueltos;
        console.log("Cupos Devueltossss: ", this.cupos)
      }
    )


    //console.log(this.cup);

    
  }
}
