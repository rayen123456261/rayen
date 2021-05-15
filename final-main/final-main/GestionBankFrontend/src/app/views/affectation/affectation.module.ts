import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { AffectationComponent } from './affectation.component';
import { AffectationRoutingModule } from './affectation-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';



@NgModule({
  imports: [
    AffectationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    Ng2SmartTableModule
  ],
  declarations: [AffectationComponent ]
})
export class AffectationModule { }
