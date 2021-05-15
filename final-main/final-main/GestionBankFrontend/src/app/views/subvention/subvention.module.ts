import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { SubventionComponent } from './subvention.component';
import { SubventionRoutingModule } from './subvention-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  imports: [
    SubventionRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    Ng2SmartTableModule

  ],
  declarations: [SubventionComponent ]
})
export class SubventionModule { }
