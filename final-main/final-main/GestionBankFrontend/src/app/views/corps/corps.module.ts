import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { CorpsComponent } from './corps.component';
import { CorpsRoutingModule } from './corps-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    CorpsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    Ng2SmartTableModule

    ],
  declarations: [CorpsComponent ]
})
export class CorpsModule { }
