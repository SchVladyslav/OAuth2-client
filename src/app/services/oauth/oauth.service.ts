import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from 'src/environments/environment';
import { ProjectService } from '../project/project.service';

@Injectable({
  providedIn: 'root',
})
export class OAuthService {
  private readonly baseUrl: string;

  constructor(
    protected httpClient: HttpClient,
  ) {
    this.baseUrl = Environment.apiHost + '/oauth';
  }

  public verifyProject(): Observable<any> {
    const params = new HttpParams()
      .append('projectID', Environment.projectID)
      .append('redirectURL', Environment.redirectURL);

    return this.httpClient.get<any>(`${this.baseUrl}/verify`, { params });
  }

  public getCode(): Observable<any> {
    const params = new HttpParams()
      .append('projectID', Environment.projectID)
      .append('redirectURL', Environment.redirectURL);

    return this.httpClient.get<any>(`${this.baseUrl}/code`, { params });
  }

  public getToken(code: string): Observable<any> {
    const params = new HttpParams()
      .append('projectID', Environment.projectID)
      .append('redirectURL', Environment.redirectURL)
      .append('code', code)
      .append('projectSecret', Environment.projectSecret);

    return this.httpClient.get<any>(`${this.baseUrl}/token`, { params });
  }

  public getUser(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/user`);
  }
}
