import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(protected httpClient: HttpClient) { }

  public fetchUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`/users`);
  }
}
