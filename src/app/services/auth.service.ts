import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  logIn(username: string, password: string): boolean {
    let users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    let success: boolean = false;
    let hasAccount: boolean = false;

    users.forEach((user) => {
      if (user.username == username) {
        if (user.password == password) {
          this.setLoggedInUser(user);
          success = true;
          hasAccount = true;
        } else {
          success = false;
          hasAccount = true;
        }
      }
    });
    if (!hasAccount) {
      let tmpUser = new User(username, password, []);
      users.push(tmpUser);
      localStorage.setItem('users', JSON.stringify(users));
      this.setLoggedInUser(tmpUser);
      success = true;
    }
    return success;
  }

  private setLoggedInUser(user: User) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  onLogOut() {
    let tmpUser: User = this.getCurrentUser();
    let users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    users.forEach((user: User) => {
      if (user.username == tmpUser.username) {
        user.activeTabs = tmpUser.activeTabs;
      }
    });

    localStorage.setItem('loggedInUser', '');
    localStorage.setItem('users', JSON.stringify(users));

    this.router.navigate(['/login']);
  }

  getCurrentUser(): User {
    return JSON.parse(localStorage.getItem('loggedInUser') || '');
  }
}
