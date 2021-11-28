import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly baseUrl: string;

  constructor(protected httpClient: HttpClient) {
    this.baseUrl = Environment.apiHost + '/project';
  }
  
  public projectSignUp(project: any): Observable<any> {
    return this.httpClient.post<any>(
      `${this.baseUrl}/signup`,
      { project }
    );
  }
}
