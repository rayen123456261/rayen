import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { GradeComponent } from './grade.component';
import { GradeRoutingModule } from './grade-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  imports: [
    GradeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    Ng2SmartTableModule,
    NgSelectModule

  ],
  declarations: [GradeComponent ]
})
export class GradeModule { }
