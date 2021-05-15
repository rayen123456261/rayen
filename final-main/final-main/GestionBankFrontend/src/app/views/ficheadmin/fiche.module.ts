import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { FicheComponent } from './fiche.component';
import { FicheRoutingModule } from './fiche-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  imports: [
    FicheRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    Ng2SmartTableModule,
    NgSelectModule,
    ModalModule,
    ModalModule.forRoot(),
    
    

  ],
  declarations: [FicheComponent ],
  providers: [DatePipe]
})
export class FicheModule { }
