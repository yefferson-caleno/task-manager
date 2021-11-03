import { Injectable } from '@angular/core';
import { constants } from 'src/app/global/constants';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/models/response/response.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatesService {
  api: string = environment.host + constants.context.API + constants.state.ENTRY_POINT;
  constructor(
    private http: HttpClient
  ) { }

  findById(id: number): Observable<Response> {
    return this.http.get<Response>(this.api+id);
  }

  findAll(): Observable<Response> {
    return this.http.get<Response>(this.api);
  }
}
