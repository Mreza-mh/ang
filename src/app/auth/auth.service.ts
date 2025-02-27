import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from './model/user.model';
import { AuthData } from './model/auth.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  authCheck = new Subject<boolean>() 

  // private apiUrl = '';

  private user! : User | null;

  // registerUser(authData: AuthData) {
    
  //   this.user = {
  //     email: authData.email,
  //     password: authData.password,
  //     userId: Math.round(Math.random()*10000).toString(),
  //   };
      // this.authCheck.next(true);
  // }
  

  constructor(private http: HttpClient , private router : Router) { }
  

  // login(authData: AuthData) {
    
  //   this.user = {
  //     email: authData.email,
  //     password: authData.password,
  //     userId: Math.round(Math.random()*10000).toString(),
  //   };
  //   this.authCheck.next(true);
  // this.router.navigate([''])
  // }

  logout() {
    this.user = null;
    this.authCheck.next(false);
  }

  getUser() {
    return {... this.user}; // copy because obj is refrence type 
  }

  isAuth(){
  return this.user != null
  }
  
}


