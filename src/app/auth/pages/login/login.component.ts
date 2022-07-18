import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor(
    private _router: Router,
    private authService: AuthService
  ) { }

  login() {
    // ir a backend
    // un usuario
    // almacenarlo en un servicio

    this.authService.login()
      .subscribe(resp => {
        console.log(resp);
        
        if (!resp.id) return;
          this._router.navigate(['./heroes']);
      })
  }

  signinWithoutLogin() {
    this.authService.logout();
    this._router.navigate(['/heroes']);
  }

}
