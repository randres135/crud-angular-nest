import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Departamento } from '../../interfaces/departamento';
import { DepartamentoService } from '../../services/departamento.service';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-form-reactivo',
  templateUrl: './form-reactivo.component.html'
})
export class FormReactivoComponent implements OnInit {


  //createEmpleado:FormGroup
  departamento:Departamento ={
    nombre: '',
    estado: true
  };

  formDep:FormGroup
  edit:boolean = false
  loading:boolean = false
  titulo = 'Agregar Departamento'
  validator = false
  
  constructor(private _depService:DepartamentoService,
              private router:Router,
              private aRoute:ActivatedRoute,
              private formBuilder:FormBuilder) {

                this.formDep = this.formBuilder.group({
                  nombre:['',Validators.required]
                })

               }


  ngOnInit(): void {
    const params = this.aRoute.snapshot.params
    if (params){
      this._depService.getDepartamento(params.id).subscribe(
        res => {
          console.log(typeof(params.id));
          this.departamento = res,
          this.edit = true
        }
      )
    }
  }



  agregarDeparamento(forma:NgForm){
    console.log(forma)
    if (forma.invalid) {
      this.validator = true
      Object.values(forma.controls).forEach(control => {
        control.markAsTouched()
      });
    } else {  
        this._depService.createDepartamento(this.departamento)
        .subscribe(
          res => {
            this.router.navigate(['/'])
          },
          err => console.log('object :>> ', err)
          )
      }
    
  }


  actualizarProducto(forma:NgForm){
    if (this.formDep.invalid) {
      this.validator = true
    } else {
      delete this.departamento.createdAt
      this._depService.updateDepartamento(this.departamento.id,this.departamento)
      .subscribe(
        res=>{
          this.router.navigate(['/list-departamentos'])
        }
      )
    }
  } 


}
