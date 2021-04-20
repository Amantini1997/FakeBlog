import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly MAX_INACTIVITY_SECONDS_BEFORE_LOGOUT = 300 ; // 5 minutes

  constructor() { }

  login(username: string, password: string) {
    if (username === environment.USERNAME && password === environment.PASSWORD) {
        localStorage.setItem(environment.isLogged, environment.isLoggedValue);
        this.updateLastActive();
        return true;
    }
    return false;
  }

  userIsLogged(): boolean {
    if (this.userIsRemembered()) {
      return true;
    }
    
    const loggedIn = localStorage.getItem(environment.isLogged) == environment.isLoggedValue;

    if (loggedIn && this.userIsActive()) {
      this.updateLastActive();
      return true;
    }

    localStorage.removeItem(environment.isLogged);
    return false;
    
  }

  userIsActive(): boolean {
    const lastActiveTime = new Date(sessionStorage.getItem(environment.lastActiveTime));
    const currentTime = new Date();
    const difference = currentTime.getTime() - lastActiveTime.getTime();
    return difference / 1000 < this.MAX_INACTIVITY_SECONDS_BEFORE_LOGOUT;
  }

  rememberUser() {
    localStorage.setItem(environment.isRemembered, environment.isRememberedValue);
  }

  userIsRemembered(): boolean {
    return localStorage.getItem(environment.isRemembered) === environment.isRememberedValue;
  }

  logout() {
    localStorage.removeItem(environment.isLogged);
    localStorage.removeItem(environment.isRemembered);
  }

  updateLastActive() {
    sessionStorage.setItem(environment.lastActiveTime, new Date().toString());
  }
}
