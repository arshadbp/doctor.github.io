import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Patient} from '../models/patient.model';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {Router, ActivatedRoute} from '@angular/router';

import { GPDetail } from '../models/gpdetail.model';
import { FacadeService } from '../Shared/Services/facade.service';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.css']
})
export class CreatePatientComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  panelTitle:string;
  @ViewChild('employeeForm') public CreatePatientForm: NgForm;

  gender = 'male';
  
  patients : Patient = {
    ID: null,
    PassNumber: null,
    ForeNames: null,
    SurName : null,
    DateOfBirth:  null,
    Gender: null,
    GeneralPartitioner: '-1',
    HomeTelephoneNumber: null,
    NOKName: null,
    relationShip: null,
    NOKAddress1: null,
    NOKAddress2: null,
    NOKAddress3:null,
    NOKAddress4: null, 
    GPSurName: null
  };

  generalPractitioners:GPDetail[];

  constructor(private _facadeService:FacadeService,
    private _router:Router,
    private _route:ActivatedRoute
  ) { 

    this.datePickerConfig = Object.assign({},
      {
        containerClass:'theme-dark-blue',
        showWeekNumbers:true,
        dateInputFormat: 'YYYY-MM-DD'
      });
  }

  ngOnInit() {
    this._route.paramMap.subscribe(parameterMap =>{
      const id = +parameterMap.get('id');
      this.getEmployee(id);
    });
  }

  private getEmployee(ID:number){
   if(ID === 0){

     this.patients = {
      ID: null,
      PassNumber: null,
      ForeNames: null,
      SurName : null,
      DateOfBirth:  null,
      Gender: null,
      GeneralPartitioner: '-1',
      HomeTelephoneNumber: null,
      NOKName: null,
      relationShip: null,
      NOKAddress1: null,
      NOKAddress2: null,
      NOKAddress3:null,
      NOKAddress4: null, 
      GPSurName: null
    };

    this._facadeService.GetGpDetails().subscribe((generalPractitioners)=>this.generalPractitioners=generalPractitioners);
    this.panelTitle = "Create Employee";

    
   }else{
    this._facadeService.GetGpDetails().subscribe((generalPractitioners)=>this.generalPractitioners=generalPractitioners);
    this.panelTitle = "Update Employee";
    this._facadeService.GetPatient(ID).subscribe((patientData)=>this.patients=patientData); 
    
   }
      
  }

  savePatients(employeeForm: NgForm): void {

    if(this.patients.ID == null){

      this._facadeService.SavePatient(this.patients).subscribe(
        (data:Patient) => {
          console.log(data);
          this.CreatePatientForm.reset();
           this._router.navigate(['list']);
        },
         (error:any) => console.log(error)
         );
    }else{
     
      this._facadeService.UpdatePatient(this.patients).subscribe(
        () => {        
          this.CreatePatientForm.reset();
           this._router.navigate(['list']);
        },
         (error:any) => console.log(error)
         );
    } 
  }
}
