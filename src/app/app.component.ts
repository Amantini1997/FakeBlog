import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  promptLogin: boolean;
  posts;

  constructor (
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.promptLogin = params['promptLogin'];
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goBack() {
    this.location.back();
  }

  hideLogout(): boolean {
    return this.router.url === '/login' && !this.promptLogin;
  }

  hideHome(): boolean {
    console.log("_________", this.router.url)
    return !this.router.url.startsWith('/home/post');
  }

}
