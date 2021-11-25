import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse } from 'src/app/interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string = '';
  private readonly baseUrl: string;

  constructor(protected httpClient: HttpClient) {
    this.baseUrl = '/api/auth';
  }

  public login(email: string, password: string): Observable<AuthResponse> {
    return this.httpClient
      .post<AuthResponse>(`${this.baseUrl}/login`, { email, password })
      .pipe(
        tap(({ accessToken }) => {
          localStorage.setItem('auth-token', accessToken);
          this.setToken(accessToken);
        })
      );
  }

  public registration(
    email: string,
    password: string
  ): Observable<AuthResponse> {
    return this.httpClient
      .post<AuthResponse>(`${this.baseUrl}/signup`, {
        email,
        password,
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
