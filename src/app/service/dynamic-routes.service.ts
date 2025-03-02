import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { FirstpageComponent } from '../pages/dashboard/components/firstpage/firstpage.component';
import { UserhomepageComponent } from '../pages/home/userhomepage/userhomepage.component';

@Injectable({
  providedIn: 'root',
})
export class DynamicRoutesService {
  constructor(private router: Router) {}

  // اضافه کردن مسیرهای داینامیک بر اساس نقش کاربر
  addRoutesForRole(role: string) {
    const routes: Routes = [];

    if (role === 'admin') {
      routes.push({
        path: 'dashboard',
        component: FirstpageComponent,
      });
    } else if (role === 'user') {
      routes.push({
        path: 'home',
        component: UserhomepageComponent,
      });
    }

    // اضافه کردن مسیرهای جدید به روتر
    this.router.resetConfig([...this.router.config, ...routes]);
  }
}

