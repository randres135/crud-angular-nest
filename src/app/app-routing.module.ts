import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDepartamentosComponent } from './components/list-departamentos/list-departamentos.component';
import { DepartamentoService } from './services/departamento.service';
import { FormDepartamentoComponent } from './components/form-departamento/form-departamento.component';

const routes: Routes = [
  {path:'',redirectTo:'list-departamentos',pathMatch:'full'},
  {path:'list-departamentos',component:ListDepartamentosComponent},
  {path:'form-departamento',component:FormDepartamentoComponent},
  {path:'edit-departamento/:id',component:FormDepartamentoComponent},
  {path:'**',redirectTo:'list-departamentos',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
