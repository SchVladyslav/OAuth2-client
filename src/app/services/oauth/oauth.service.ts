import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OAuthService {

  private readonly baseUrl: string;

  constructor(protected httpClient: HttpClient) {
    this.baseUrl = Environment.apiHost + '/oauth';
  }

  public logInWithOAuth(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}`);
  }
}