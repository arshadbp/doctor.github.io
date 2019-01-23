import { Component, OnInit, ViewChild } from '@angular/core';
import {GPDetail} from '../models/gpdetail.model';
import { NgForm } from '@angular/forms';

import {Router, ActivatedRoute} from '@angular/router';

import { FacadeService } from '../Shared/Services/facade.service';

@Component({
  selector: 'app-create-gpdetail',
  templateUrl: './create-gpdetail.component.html',
  styleUrls: ['./create-gpdetail.component.css']
})
export class CreateGpdetailComponent implements OnInit {

  constructor(private _facadeService:FacadeService,private _router:Router) { }
 
  gpDetail : GPDetail = {
    ID:null,
    GPCode: null,
    GPSurname: null,
    GPInitials :null,
    GPPhone: null
  };

  @ViewChild('gpDetailForm') public CreateGPForm: NgForm;

  ngOnInit() {
  }

  saveGPDetail(employeeForm: NgForm): void {
      this._facadeService.SaveGPDetails(this.gpDetail).subscribe(
        (data:GPDetail) => {
          console.log(data);
          this.CreateGPForm.reset();
          this._router.navigate(['list']);
        },
         (error:any) => console.log(error)
         );

  }
}
