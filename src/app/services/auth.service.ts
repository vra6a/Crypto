import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

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
}
