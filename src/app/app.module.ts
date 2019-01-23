import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {SelectRequiredValidatorDirective} from './Shared/select-required-valiator.directive';


import {CreateEmployeeCanDeactivateGuardService} from './patients/create-patient-can-deactive-guard.service';
import {HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { ListPatientsComponent } from './patients/list-patients.component';
import { CreatePatientComponent } from './patients/create-patient.component';
import { PatientDetailsComponent } from './patients/patient-details.component';
import { CreateGpdetailComponent } from './gpdetail/create-gpdetail.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import {FacadeService} from './Shared/Services/facade.service';
import {GPDetailsService} from './Shared/Services/gpdetails.sevice';
import {PatientsService} from './Shared/Services/patients.service';

 const appRoutes:Routes=[
   { path:'list',component:ListPatientsComponent },
   { path:'edit/:id',
   component:CreatePatientComponent,
   canDeactivate:[CreateEmployeeCanDeactivateGuardService] 
  },
  { path:'patients/:id',component:PatientDetailsComponent },
  { path:'creategpdetail',component:CreateGpdetailComponent },
   { path:'',redirectTo:'/list',pathMatch:'full' }
 ]

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    ListPatientsComponent,
    CreatePatientComponent,
    SelectRequiredValidatorDirective,
    PatientDetailsComponent,
    CreateGpdetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    Ng2SearchPipeModule,
    NgxPaginationModule
  ],
  exports:[
    NgxPaginationModule
  ],
  providers: [
    FacadeService,
    GPDetailsService,
    PatientsService,
    CreateEmployeeCanDeactivateGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
