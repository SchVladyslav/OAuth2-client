import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Project } from 'src/app/interfaces/project.interface';
import { Environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly baseUrl: string;

  constructor(protected httpClient: HttpClient) {
    this.baseUrl = Environment.apiHost + '/project';
  }

  public projectSignUp(project: any): Observable<any> {
    return this.httpClient
      .post<any>(`${this.baseUrl}/create`, { ...project });
  }

  public getProjects(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/projects-list`);
  }
}
