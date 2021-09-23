import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { Departamento } from '../../interfaces/departamento';


import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-departamentos',
  templateUrl: './list-departamentos.component.html'
})
export class ListDepartamentosComponent implements OnInit {

  departamento:Departamento[]=[]
  constructor(private depService:DepartamentoService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
   this.getDepartamento()
  }

  getDepartamento(){
    this.depService.getDepartamentos().subscribe(data=>{
      this.departamento = data
    }
    )
  }

  eliminarEmpleado(id:any){

    Swal.fire({
      title: 'Esta seguro de elminar registro?',
      text: 'Eliminara registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.depService.deleteDepartamento(+id)
        .subscribe(
          res=>{
            this.toastr.error( `Eliminado con Exito`,'Registro Eliminado',{
              positionClass:'toast-bottom-right'      
            })
            this.getDepartamento()
                },
          error => console.log(error)
        ) 
      }
    })
  }
}
