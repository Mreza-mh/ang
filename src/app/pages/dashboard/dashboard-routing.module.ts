import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FirstpageComponent } from './components/firstpage/firstpage.component';

const routes: Routes = [
  {
    path: '', 
    component: FirstpageComponent,  
    children: [
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
