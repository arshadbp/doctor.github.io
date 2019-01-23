import {Injectable} from '@angular/core';
import { Patient } from '../../models/patient.model';
import { Observer } from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';
import {Http,Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class PatientsService{

    baseAPI_URL = 'http://localhost:58010/api';
    
    //.............. Inject dependencies
    constructor(private _http:Http,
        private _httpClient:HttpClient
    ){}

  

   //............... Get Patients
   getPatients(): Observable<Patient[]> {
    return  this._http.get(this.baseAPI_URL + '/Patient')
       .map((response:Response)=><Patient[]>response.json())
       .catch(this.handleError);
   }

   //............... Get Patient by ID
   getPatient(ID:number): Observable<Patient> {
    return  this._http.get(this.baseAPI_URL+'/Patient/'+ID)
                      .map((response:Response)=><Patient[]>response.json())
                      .catch(this.handleError);
   }

   //............... Save Patient
   Save(patient: Patient):Observable<Patient>{
         return this._httpClient.post<Patient>(this.baseAPI_URL+'/Patient/AddPatient',patient,{
             headers:new HttpHeaders({
                 'Content-Type':'application/json'
               })
         }).catch(this.handleError);;        
   }

   //............... Update Patient
   UpdatePatient(patient: Patient):Observable<void>{
        return this._httpClient.put<void>(this.baseAPI_URL+'/Patient/'+ patient.ID,patient,{
            headers:new HttpHeaders({
                'Content-Type':'application/json'
              })
        }).catch(this.handleError);     
  }

  //............... Delete Patient
   deletePatient(id:number):Observable<void>{
    return this._httpClient.delete<void>(this.baseAPI_URL+'/Patient/'+id,{
      headers:new HttpHeaders({
          'Content-Type':'application/json'
        })
     }).catch(this.handleError);
   }

   private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
        console.error('Client Side Error :', errorResponse.error.message);
    } else {
        console.error('Server Side Error :', errorResponse);
    }
    // return an observable with a meaningful error message to the end user
    return new ErrorObservable('There is a problem with the service.We are notified & working on it. Please try again later.');
}

}