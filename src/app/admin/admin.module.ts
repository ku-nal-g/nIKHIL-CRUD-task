import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GlobalService } from 'src/app/common/services/global.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { AdmissionComponent } from './components/admission/admission.component';
import { AdministrationComponent } from './components/administration/administration.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    DashboardHomeComponent,
    AdmissionComponent,
    AdministrationComponent
  ],
  providers: [GlobalService],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class AdminModule { }
