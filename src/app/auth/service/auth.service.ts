import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoginDto } from '../dto/login.dto';
import { Constants } from '../../data/constants';
import { HttpClient } from '@angular/common/http';
import { BearerDto } from '../dto/bearer.dto';

export interface TokenInfo {
  token: string;
  exp: number;
  iat: number;
  roles: string[];
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = Constants.baseServerUrl + '/auth';
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);

  private _tokenInfo$: BehaviorSubject<TokenInfo | null> =
    new BehaviorSubject<TokenInfo | null>(null);

  private _loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  get loggedIn$(): Observable<boolean> {
    return this._loggedIn$.asObservable();
  }

  get token() {
    return this._tokenInfo$.getValue()?.token;
  }

  public login(login: LoginDto, nextUrl: string) {
    this.logout(null);
    return this.http.post<BearerDto>(`${this.baseUrl}/login`, login).pipe(
      tap((dto) => {
        this.loadToken(dto.token);
        if (this._tokenInfo$.value) {
          if (nextUrl) {
            this.router.navigateByUrl(nextUrl).finally();
          }
        }
      })
    );
  }

  public logout(nextUrl: string | null) {
    this._tokenInfo$.next(null);
    this._loggedIn$.next(false);
    if (nextUrl) {
      this.router.navigateByUrl(nextUrl).finally();
    }
  }

  public isMemberOf(role: string): Observable<boolean> {
    return this._tokenInfo$.pipe(
      map((profile) => {
        return !!profile?.roles.find((r) => r === role);
      })
    );
  }

  private loadToken(token: string) {
    this._loggedIn$.next(true);
    const info = this.parseJwt(token);
    if (info) {
      this._tokenInfo$.next({
        token,
        exp: info.exp,
        iat: info.iat,
        roles: info.roles,
        username: info.username,
      });
    } else {
      this.logout(null);
    }
  }

  private parseJwt(token: string): TokenInfo | null {
    try {
      return JSON.parse(atob(token.split('.')[1])) as TokenInfo;
    } catch (e) {
      return null;
    }
  }
}
