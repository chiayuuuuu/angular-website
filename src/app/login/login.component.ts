import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  uid = 'user';
  pwd = 'user';
  admin = 'admin';
  admin_pwd = 'admin';
  userid = '';
  userpwd = '';
  test = '';
  isLoggedIn = false;

  constructor(private router: Router) {}

  onLogin() {
    console.log('uid=', this.userid);
    console.log('pwd=', this.userpwd);
    if (this.userid == 'user' && this.userpwd == 'user') {
      this.router.navigate(['/home']);
    } else if (this.userid == 'admin' && this.userpwd == 'admin') {
      this.router.navigate(['/admin']);
    } else if (this.userid == '') {
      alert('帳號不能為空！');
    } else if (this.userpwd == '') {
      alert('密碼不能為空！');
    } else {
      alert('帳號或密碼錯誤');
      this.router.navigate(['/login']);
    }
  }
}
