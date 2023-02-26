
import { AdministrationComponent } from './components/administration/administration.component';

import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmissionComponent } from './components/admission/admission.component';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardHomeComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'admission',
        component: AdmissionComponent
      },
      {
        path: 'administration',
        component: AdministrationComponent
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
