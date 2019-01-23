import {Injectable} from '@angular/core';
import { GPDetail } from '../../models/gpdetail.model';
import { Observer } from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';
import {Http,Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
//..........  GPDetailService
export class GPDetailsService{

  baseAPIUrl = 'http://localhost:58010/api';
   
  //......    Inject dependencies 
   constructor(
       private _http:Http,
       private _httpClient:HttpClient){}

   
   //......   Get GPDetails
   getGpDetails(): Observable<GPDetail[]> 
   {    
    return  this._http.get(this.baseAPIUrl+'/GPDetail')
       .map((response:Response)=><GPDetail[]>response.json())
       .catch(this.handleError);
   }
 
   //......  Save General Practitioner data to database
   Save(gpDetail: GPDetail):Observable<GPDetail>
    {       
         return this._httpClient.post<GPDetail>(this.baseAPIUrl+'/GPDetail/AddGPDetail',gpDetail,{
             headers:new HttpHeaders({
                 'Content-Type':'application/json'
               })
         }).catch(this.handleError);;        
    }

    private handleError(errorResponse: HttpErrorResponse) 
    {
     if (errorResponse.error instanceof ErrorEvent) {
         console.error('Client Side Error :', errorResponse.error.message);
     } else {
         console.error('Server Side Error :', errorResponse);
     }
     return new ErrorObservable('There is a problem with the service.We are notified & working on it. Please try again later.');
     }
}