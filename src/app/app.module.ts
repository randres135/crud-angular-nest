import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListDepartamentosComponent } from './components/list-departamentos/list-departamentos.component';
import { FormDepartamentoComponent } from './components/form-departamento/form-departamento.component';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormReactivoComponent } from './components/form-reactivo/form-reactivo.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListDepartamentosComponent,
    FormDepartamentoComponent,
    FormReactivoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
