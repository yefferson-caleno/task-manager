import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constants } from 'src/app/global/constants';
import { LoginRequest } from 'src/app/models/login/login.model';
import { Response } from 'src/app/models/response/response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  api: string = environment.host + constants.context.API + constants.login.ENTRY_POINT;
  constructor(
    private http: HttpClient
  ) { }

  login(login: LoginRequest): Observable<Response> {
    return this.http.post<Response>(this.api, login);
  }
}
