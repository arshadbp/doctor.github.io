import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Employee } from '../models/employee.model';
import { Patient } from '../models/patient.model';
import { FacadeService } from '../Shared/Services/facade.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
 patientdetail: Patient;
  constructor(private _route: ActivatedRoute,
              private _facadeService:FacadeService
  ) { }

  ngOnInit() {
    const id =  +this._route.snapshot.params['id'];
    this._facadeService.GetPatient(id).subscribe(
      (patientData)=>this.patientdetail=patientData); 
    //this.patient = this._patientService.getPatient(id);
  }
}
