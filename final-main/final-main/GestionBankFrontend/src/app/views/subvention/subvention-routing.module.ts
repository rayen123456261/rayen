import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubventionComponent } from './subvention.component';

const routes: Routes = [
  {
    path: '',
    component: SubventionComponent,
    data: {
      title: 'indemnité'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubventionRoutingModule {}
