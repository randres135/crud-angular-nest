import { REFERENCE_PREFIX } from '@angular/compiler/src/render3/view/util';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Departamento } from '../../interfaces/departamento';
import { DepartamentoService } from '../../services/departamento.service';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-form-departamento',
  templateUrl: './form-departamento.component.html'
})
export class FormDepartamentoComponent implements OnInit {
  


  formDep:FormGroup
  edit:boolean = false
  loading:boolean = false
  titulo = 'Agregar Empleado'
  validator = false
  id:number
  
  constructor(private _depService:DepartamentoService,
              private router:Router,
              private aRoute:ActivatedRoute,
              private formBuilder:FormBuilder,
              private validadores:ValidadoresService,
              private toastr: ToastrService) {


                this.formDep = this.formBuilder.group({
                  nombre:['',Validators.required,this.validadores.existeRegistro],
                  estado:[true]
                })
                this.crearListeners()
               }


  ngOnInit(): void {
    const params = this.aRoute.snapshot.params
    if (params){
      this._depService.getDepartamento(params.id).subscribe(
        res => {
          this.edit = true
          this.id = res.id
          this.formDep.patchValue({
            nombre:res.nombre
          })
          this.titulo = 'Editar Empleado' 
        }
      )
    }
  }

  get nombreNoValido(){
    return this.formDep.get('nombre')?.invalid && this.formDep.get('nombre')?.touched
  }

  agregarDeparamento(){
    if (this.formDep.invalid) {
      this.validator = true
      return Object.values(this.formDep.controls).forEach(control => {
        control.markAsTouched()
      });
    } else {
        this._depService.createDepartamento(this.formDep.value)
        .subscribe(
          res => {
            this.toastr.success( `Agregado con Exito`,'Registro Agregado',{
              positionClass:'toast-bottom-right'      
            })
            this.router.navigate(['/'])
          },
          err => console.log('object :>> ', err)
          )
      }
    
  }

  actualizarProducto(){
    if (this.formDep.invalid) {
      this.validator = true
      return Object.values(this.formDep.controls).forEach(control => {
        control.markAsTouched()
      });
    } else {
      this.toastr.success( `Modificado con Exito`,'Registro Modificado',{
        positionClass:'toast-bottom-right'      
      })
      this._depService.updateDepartamento(this.id,this.formDep.value)
      .subscribe(
        res=>{
          this.router.navigate(['/list-departamentos'])
        }
      )
    }
  } 


  crearListeners(){
    this.formDep.valueChanges.subscribe(valor=>{
      console.log(valor);
    })
    this.formDep.statusChanges.subscribe(valor=>{
      console.log(valor)
    })
    this.formDep.get('nombre').valueChanges.subscribe(console.log)
  }

}
