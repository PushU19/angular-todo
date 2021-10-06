import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../_material/material.module';
import { AuthRoutingModule } from './authorization-routing.module';

import { AuthorizationComponent } from '../authorization/authorization.component';

@NgModule({
    declarations: [AuthorizationComponent],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        AuthRoutingModule,
    ],
})
export class AuthorizationModule {
}
