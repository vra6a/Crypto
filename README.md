# Crypto

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.5.

The application is a simple application to check crypto currency exchange rates. The user first have to register an account with an username and password. (The next login with this username will require the correct password.) In the application the user can open new tabs, with the + on the tab header, check current high's and low's on the left side of the application by pressing the menu button (3 lines). The user can log out of the account, which will save the current tabs and on the next login it will reload them.

To start the application, first run `npm install` for node modules, then `npm start`. It will create a server on `http://localhost:4200/`.

## Side notes

- Currently the application's websocket part only supports Coinbase, but it can be easily changed.
- The application only supports USD
