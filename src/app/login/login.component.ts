import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/authentication.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor (
    private authService: AuthService,
    private router: Router
  ) { 
    if (authService.userIsLogged()) {
      this.goToHomePage();
    }
  }

  attemptLogin(username: string, password: string, rememberMe: boolean) {
    if (this.authService.login(username, password)) {
      if (rememberMe) {
        this.authService.rememberUser();
      }
      this.goToHomePage();
    }
  }

  goToHomePage() {
    this.router.navigate(['/home']);
  }

}
