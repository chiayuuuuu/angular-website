import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  userid = '';
  isLoggedIn = false;

  login(PostData: { userid: string; password: string }) {
    this.userid = this.userid;
    if (PostData.userid === 'user' && PostData.password === 'user') {
      this.isLoggedIn = true;
      return true;
    }
    return false;
  }

  logout() {
    this.isLoggedIn = false;
  }

  getIsLoggedIn() {
    return this.isLoggedIn;
  }

  getUserId() {
    return this.userid;
  }
}
