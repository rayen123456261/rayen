import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CorpsComponent } from './corps.component';

const routes: Routes = [
  {
    path: '',
    component: CorpsComponent,
    data: {
      title: 'Corps'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorpsRoutingModule {}
