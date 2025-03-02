import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { OverviewComponent } from './pages/overview/overview.component'; // مثال برای یک زیرصفحه
import { authGuard } from 'src/app/auth/guard/auth.guard';
import { FirstpageComponent } from './components/firstpage/firstpage.component';

const routes: Routes = [
  {
    path: '', // مسیر اصلی داشبورد
    component: FirstpageComponent, 
    // canActivate: [], 
    children: [
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
