import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FicheComponent } from './fiche.component';

const routes: Routes = [
  {
    path: '',
    component: FicheComponent,
    data: {
      title: 'Fiche Agent'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FicheRoutingModule {}
