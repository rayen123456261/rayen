import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubventionSpecialeComponent } from './subvention-speciale.component';

const routes: Routes = [
  {
    path: '',
    component: SubventionSpecialeComponent,
    data: {
      title: 'indemnité lié au grade'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubventionSpecialeRoutingModule {}
