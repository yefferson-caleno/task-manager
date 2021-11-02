import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constants } from 'src/app/global/constants';
import { UserRequest } from 'src/app/models/users/users.model';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/models/response/response.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  api: string = environment.host + constants.context.API + constants.user.ENTRY_POINT;
  constructor(
    private http: HttpClient
  ) { }

  findById(id: number): Observable<Response> {
    return this.http.get<Response>(this.api+id);
  }

  findAll(): Observable<Response> {
    return this.http.get<Response>(this.api);
  }

  save(user: UserRequest): Observable<Response> {
    return this.http.post<Response>(this.api, user);
  }

  update(id:number, user:UserRequest): Observable<Response> {
    return this.http.patch<Response>(this.api+id, user);
  }
}
