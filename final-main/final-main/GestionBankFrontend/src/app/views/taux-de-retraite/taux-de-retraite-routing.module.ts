import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TauxDeRetraiteComponent } from './taux-de-retraite.component';

const routes: Routes = [
  {
    path: '',
    component: TauxDeRetraiteComponent,
    data: {
      title: 'Taux De Retraite'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TauxDeRetraiteRoutingModule {}
