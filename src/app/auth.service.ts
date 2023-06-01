import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userid = '';
  status = '';
  isLoggedIn = false;
  constructor(private http: HttpClient) {}

  login(value: { uid: string; password: string }) {
    const url = 'http://localhost:8080/api/account/status';
    this.http.post(url, value).subscribe((d) => {
      this.status = d.toString();
      if (this.status == 'admin success') {
        this.isLoggedIn = true;
      } else if (this.status == "admin's password wrong") {
        this.isLoggedIn = false;
      } else if (this.status == 'wrong') {
        this.isLoggedIn = false;
      }
      return this.isLoggedIn;
    });
    return this.isLoggedIn;
    // this.userid = this.userid;
    // if (PostData.userid === '' && PostData.password === 'user') {
    //   this.isLoggedIn = true;
    //   return true;
    // }
    // return false;
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
