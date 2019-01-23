import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CreatePatientComponent } from './create-patient.component';

@Injectable()
export class CreateEmployeeCanDeactivateGuardService
    implements CanDeactivate<CreatePatientComponent> {

    constructor() { }

    canDeactivate(component: CreatePatientComponent): boolean {
        if (component.CreatePatientForm.dirty) {
            return confirm('Are you sure you want to discard your changes?');
        }

        return true;
    }
}