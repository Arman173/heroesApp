import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth(): Auth {
    return { ...this._auth! };
  }

  constructor(
    private _http: HttpClient
  ) { }

  verifyAuth(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);

    return this._http.get<Auth>(`${ this.baseUrl }/usuarios/1`)
            .pipe(
              map(auth => {
                this._auth = auth;
                return true;
              })
            );
  }
  
  login(): Observable<Auth> {
    return this._http.get<Auth>(`${ this.baseUrl }/usuarios/1`)
            .pipe(
              tap( auth => this._auth = auth ),
              tap( auth => localStorage.setItem('token', auth.id) )
            );
  }

  logout() {
    localStorage.removeItem('token');
    console.log('logout');
    this._auth = undefined;
  }

}
