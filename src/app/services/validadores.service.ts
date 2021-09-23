import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s:string]:boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  existeRegistro(control:FormControl):Promise<ErrorValidate>|Observable<ErrorValidate>{

    if (!control.value) {
      return Promise.resolve(null)
    }

    return new Promise ((resolve,reject)=>{
      setTimeout(()=>{
        if (control.value === 'abel') {
          resolve({existe:true})
        } else {
          resolve(null)
        }
      },1000)
    })
  }

  nombreDuplicado (control:FormControl):ErrorValidate{
    if (control.value?.toLowerCase()==='abel') {
      return {
        nombreDuplicado:true
      }
    }
    
    /*
    * NOTA:
    * Para que funcione el return null 
    * cambiar en el tsconfig en las opciones de "compilerOptions", la opcion
    * "strict": true, a -> "strict": false,
    */
    return null;
  }
}
