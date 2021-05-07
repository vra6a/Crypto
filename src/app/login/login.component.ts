import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onLogin(username: string, password: string) {
    if (this.auth.logIn(username, password)) {
      this._snackBar.open('Log in was succesful!', 'Ok', { duration: 2000 });
      this.router.navigate(['main']);
    } else {
      this._snackBar.open('Wrong password!', 'Ok', { duration: 2000 });
    }
  }
}
