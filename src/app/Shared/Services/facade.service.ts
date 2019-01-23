import { Injectable, Injector } from "@angular/core";
import { GPDetailsService } from "./gpdetails.sevice";
import { PatientsService } from "./patients.service";
import { Patient } from "../../models/patient.model";
import { GPDetail } from "../../models/gpdetail.model";

@Injectable()
//.......... Face Design Patten in Implemented 
export class FacadeService{

    //......... Inject Dependencies
    constructor(private _patientService: PatientsService,
        private _gpDetailService:GPDetailsService ) {  }
   
    //..........Get All Patients 
    GetPatients(){
        return this._patientService.getPatients();
    }

    //..........Get Patient By ID 
    GetPatient(ID:number){
        return this._patientService.getPatient(ID);
    }
    
    //..........Save Patients To Database 
    SavePatient(patient: Patient){
        return this._patientService.Save(patient);
    }

    //..........Update Patient  
    UpdatePatient(patient: Patient){
        return this._patientService.UpdatePatient(patient);
    }

    //..........Delete Patient by ID
    DeletePatient(id:number){
        return this._patientService.deletePatient(id);
    }

    //..........GetGpDetails for dropdownlist
    GetGpDetails(){
        return this._gpDetailService.getGpDetails(); 
    }

    //..........Save GPDetails in Database
    SaveGPDetails(gpDetail: GPDetail){
      return this._gpDetailService.Save(gpDetail);
    }  
}