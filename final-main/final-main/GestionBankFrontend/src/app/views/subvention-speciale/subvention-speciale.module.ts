import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { SubventionSpecialeComponent } from './subvention-speciale.component';
import { SubventionSpecialeRoutingModule } from './subvention-speciale-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  imports: [
    SubventionSpecialeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    Ng2SmartTableModule,
    NgSelectModule

  ],
  declarations: [SubventionSpecialeComponent ]
})
export class SubventionSpecialeModule { }
