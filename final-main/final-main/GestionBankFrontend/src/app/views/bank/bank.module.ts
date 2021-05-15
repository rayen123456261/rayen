import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { BankComponent } from './bank.component';
import { BankRoutingModule } from './bank-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  imports: [
    BankRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    Ng2SmartTableModule

  ],
  declarations: [BankComponent ]
})
export class BankModule { }
