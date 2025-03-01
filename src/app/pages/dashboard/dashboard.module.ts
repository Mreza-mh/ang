import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstpageComponent } from './components/firstpage/firstpage.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
// import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';



@NgModule({
  declarations: [FirstpageComponent ],
  imports: [CommonModule, DashboardRoutingModule , SharedModule],
})
export class DashboardModule {}
