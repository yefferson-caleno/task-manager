import { Injectable } from '@angular/core';
import { constants } from 'src/app/global/constants';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/models/response/response.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskRequest } from 'src/app/models/tasks/tasks.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  api: string = environment.host + constants.context.API + constants.task.ENTRY_POINT;
  constructor(
    private http: HttpClient
  ) { }

  findById(id: number): Observable<Response> {
    return this.http.get<Response>(this.api+id);
  }

  findAll(): Observable<Response> {
    return this.http.get<Response>(this.api);
  }

  save(task: TaskRequest): Observable<Response> {
    return this.http.post<Response>(this.api, task);
  }

  update(id:number, task:TaskRequest): Observable<Response> {
    return this.http.patch<Response>(this.api+id, task);
  }
}
