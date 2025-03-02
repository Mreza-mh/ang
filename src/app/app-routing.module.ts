import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth/guard/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { UserhomepageComponent } from './pages/home/userhomepage/userhomepage.component';

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
    canActivate: [RoleGuard], // استفاده از RoleGuard
    data: { role: 'user' }, // نقش مورد نیاز
  },

  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}


