export class Usuario {

    ///Creo el usuario inyectando
  
    constructor( public username: string,                 
                 public password: string,
                 public email?: string,
                 public img?: string,
                 public role?: string,
                 public google?: boolean,
                 public id?: string,
                 public nombreFantasia?:string ) {
  
                   }
  
  
  }