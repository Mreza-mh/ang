import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth/service/auth.service';


@Component({
  selector: 'app-firstpage',
  templateUrl: "./firstpage.component.html",
  styleUrls: ['./firstpage.component.scss'],
})
export class FirstpageComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().then((isAuth) => {
      if (!isAuth) {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  logout(){
    try{
      this.authService.logout();
    }catch{
      console.error('Logout failed');
    }
  }

}
