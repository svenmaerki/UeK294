import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoginDto } from '../dto/login.dto';
import { BearerDto } from '../dto/bearer.dto';
import { Constants } from '../../data/constants';

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
  private static readonly MOCK_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJzdWIiOjEsInJvbGVzIjpbInVzZXIiXSwicmlnaHRzIjpbInByb2ZpbGVHZXRQcm9maWxlIiwiYmFzZUJhc2VGaW5kIiwiYmFzZUJhc2VGaW5kT25lQnkiLCJiYXNlQmFzZUNyZWF0ZSIsImJhc2VCYXNlVXBkYXRlIiwiYmFzZUJhc2VSZXBsYWNlIl0sImlhdCI6MTY4Nzk0MjQ3OSwiZXhwIjoxNjg3OTQyNzc5LCJpc3MiOiJJQ1QtVWVrIn0.2pTpaI63Ylf4IpLIGuTqyhq1yxCDNy4d790lxOyPBUo';

  private readonly baseUrl = Constants.baseServerUrl + '/auth';

  constructor(private readonly router: Router) {}

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
    const TOKEN_MOCK_RESPONSE: BearerDto = { token: AuthService.MOCK_TOKEN };
    return of(TOKEN_MOCK_RESPONSE).pipe(
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
