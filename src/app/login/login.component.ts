import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userid = '';
  userpwd = '';
  test = '';
  isLoggedIn = false;
  status = '';
  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}
  onLogin(postData: { uid: string; password: string }) {
    console.log('uid=', this.userid);
    console.log('pwd=', this.userpwd);
    // if (this.userid == 'user' && this.userpwd == 'user') {
    //   this.router.navigate(['/home']);
    // } else if (this.userid == 'admin' && this.userpwd == 'admin') {
    //   this.router.navigate(['/admin']);
    // } else if (this.userid == '') {
    //   alert('帳號不能為空！');
    // } else if (this.userpwd == '') {
    //   alert('密碼不能為空！');
    // } else {
    //   alert('帳號或密碼錯誤');
    //   this.router.navigate(['/login']);
    // }
    if (this.userid == '') {
      alert('帳號不能為空！');
    } else if (this.userpwd == '') {
      alert('密碼不能為空！');
    } else if (this.userid == '' && this.userpwd == '') {
      alert('帳號或密碼不能為空！');
    } else {
      this.isLoggedIn = this.authService.login(postData);
      console.log('login=',this.isLoggedIn)
      if(this.isLoggedIn){
        this.router.navigate(['/admin']);
      }else{
        this.router.navigate(['/login']);
      }
      // this.authService.login(postData).subscribe((data: any) => {
      // if (data) {
      // console.log('data=', data);
      // localStorage.setItem('jwt', data);
      // this.status = data.toString();
      // console.log('status=', this.status);
      // if (this.status == 'user success') {
      //   this.router.navigate(['/home']);
      // } else if (this.status == 'admin success') {
      //   this.router.navigate(['/admin']);
      // } else if (
      //   this.status == "user's password wrong" ||
      //   this.status == "admin's password wrong"
      // ) {
      //   alert('密碼錯誤，請重新登入！');
      //   this.userid = '';
      //   this.userpwd = '';
      //   this.router.navigate(['/login']);
      // } else if (this.status == 'wrong') {
      //   alert('帳號或密碼錯誤');
      //   this.userid = '';
      //   this.userpwd = '';
      //   this.router.navigate(['/login']);
      // }
    }
  }
}
