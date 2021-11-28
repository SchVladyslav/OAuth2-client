import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse, AuthData } from 'src/app/interfaces/auth.interface';
import { Environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string = '';
  private readonly baseUrl: string;

  constructor(protected httpClient: HttpClient) {
    this.baseUrl = Environment.apiHost + '/auth';
  }

  public login(user: AuthData): Observable<AuthResponse> {
    return this.httpClient
      .post<AuthResponse>(`${this.baseUrl}/login`, { ...user })
      .pipe(
        tap(({ accessToken }) => {
          localStorage.setItem('auth-token', accessToken);
          this.setToken(accessToken);
        })
      );
  }

  public signup(user: AuthData): Observable<AuthResponse> {
    return this.httpClient
      .post<AuthResponse>(`${this.baseUrl}/signup`, {
        ...user,
      })
      .pipe(
        tap(({ accessToken }) => {
          localStorage.setItem('auth-token', accessToken);
          this.setToken(accessToken);
        })
      );
  }

  public logout(): Observable<void> {
    return this.httpClient.post<void>(`/logout`, {});
  }

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}
