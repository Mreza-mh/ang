import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from './guards/role.guard';
import { UserhomepageComponent } from './pages/home/userhomepage/userhomepage.component';
import { LandingComponent } from './pages/landing/landing.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [RoleGuard],
    data: { role: 'admin' },
  },
  {
    path: 'home',
    component: UserhomepageComponent,
    canActivate: [RoleGuard],
    data: { role: 'user' },
  },

  { path: '', component: LandingComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}


