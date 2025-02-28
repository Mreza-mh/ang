import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstpageComponent } from './components/firstpage/firstpage.component';
import { DashboardRoutingModule } from './dashboard-routing.module';



@NgModule({
  declarations: [FirstpageComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
