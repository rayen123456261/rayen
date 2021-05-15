import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { TauxDeRetraiteComponent } from './taux-de-retraite.component';
import { TauxDeRetraiteRoutingModule } from './taux-de-retraite-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  imports: [
    TauxDeRetraiteRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    Ng2SmartTableModule

  ],
  declarations: [TauxDeRetraiteComponent ]
})
export class TauxDeRetraiteModule { }
