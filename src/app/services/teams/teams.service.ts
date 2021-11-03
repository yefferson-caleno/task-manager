import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constants } from 'src/app/global/constants';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/models/response/response.model';
import { TeamRequest } from 'src/app/models/teams/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  api: string = environment.host + constants.context.API + constants.team.ENTRY_POINT;
  constructor(
    private http: HttpClient
  ) { }

  findById(id: number): Observable<Response> {
    return this.http.get<Response>(this.api+id);
  }

  findAll(): Observable<Response> {
    return this.http.get<Response>(this.api);
  }

  save(team: TeamRequest): Observable<Response> {
    return this.http.post<Response>(this.api, team);
  }

  update(id:number, team:TeamRequest): Observable<Response> {
    return this.http.patch<Response>(this.api+id, team);
  }
}
