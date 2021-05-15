import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AffectationComponent } from './affectation.component';

const routes: Routes = [
  {
    path: '',
    component: AffectationComponent,
    data: {
      title: 'Affectation'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AffectationRoutingModule {}
