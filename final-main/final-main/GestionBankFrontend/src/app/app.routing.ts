import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { CalculComponent } from './client/calcul/calcul.component';
import { ClientComponent } from './client/client.component';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { AuthGuard } from './guards/auth.guard';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { FicheComponent } from './views/fiche/fiche.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';


export const routes: Routes = [
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'client',
    component: ClientComponent,
    canActivate: [AuthGuard],

    children :[
       {
        path: 'fiche',
        loadChildren: () => import('./views/fiche/fiche.module').then(m => m.FicheModule)

      },
      {
        path: 'calcul',
        component : CalculComponent

      },



    ]

  },


  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Acceuil'
    },
    children: [

      {
        path: 'affectation',
        loadChildren: () => import('./views/affectation/affectation.module').then(m => m.AffectationModule)

      },
      {
        path: 'corps',
        loadChildren: () => import('./views/corps/corps.module').then(m => m.CorpsModule)

      },
      {
        path: 'grade',
        loadChildren: () => import('./views/grade/grade.module').then(m => m.GradeModule)

      },
      {
        path: 'bank',
        loadChildren: () => import('./views/bank/bank.module').then(m => m.BankModule)

      },
      {
        path: 'subvention',
        loadChildren: () => import('./views/subvention/subvention.module').then(m => m.SubventionModule)

      },
      {
        path: 'tauxDeRetraite',
        loadChildren: () => import('./views/taux-de-retraite/taux-de-retraite.module').then(m => m.TauxDeRetraiteModule)

      },
      {
        path: 'subventionSpeciale',
        loadChildren: () => import('./views/subvention-speciale/subvention-speciale.module').then(m => m.SubventionSpecialeModule)

      },
      {
        path: 'fiche',
        loadChildren: () => import('./views/ficheadmin/fiche.module').then(m => m.FicheModule)

      },
      {
        path: 'calcul',
        component : CalculComponent
      },

    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
