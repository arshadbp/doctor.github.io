import { Component, OnInit } from '@angular/core';
import { Patient } from '../models/patient.model';

import {Router} from '@angular/router';

import { FacadeService } from '../Shared/Services/facade.service';
@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.css']
})
export class ListPatientsComponent implements OnInit {
  //initializing p to one
  p: number = 1;
   patients:Patient[];
  constructor(private _facadePattern:FacadeService,
       private _router: Router
     ) {   }
  ngOnInit() { 
    // this._patientService.getPatients().subscribe((patientData)=>this.patients=patientData);
    this._facadePattern.GetPatients().subscribe((patientData)=>this.patients=patientData);;
  }
  
  onDetail(patientID:number){

    this._router.navigate(['/patients',patientID]);
  }  

  onDelete(patientID:number){

    if(confirm("Are you sure to delete ?")) {
      this._facadePattern.DeletePatient(patientID).subscribe(
        () => {        
          this._router.navigate(['list']);
        },
         (error:any) => console.log(error)
         );
      //   this._router.navigate(['/patients',patientID]);
    }


  }
  onEdit(patientID:number){

    this._router.navigate(['/edit',patientID]);
  }
}
