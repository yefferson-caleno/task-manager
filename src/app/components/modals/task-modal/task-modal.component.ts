import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ToastService } from 'ng-uikit-pro-standard';
import { constants } from 'src/app/global/constants';
import { LoginResponse } from 'src/app/models/login/login.model';
import { State } from 'src/app/models/states/states.model';
import { Status } from 'src/app/models/status/status.model';
import { Task, TaskRequest } from 'src/app/models/tasks/tasks.model';
import { Team } from 'src/app/models/teams/team.model';
import { User } from 'src/app/models/users/users.model';
import { StatesService } from 'src/app/services/states/states.service';
import { StatusService } from 'src/app/services/status/status.service';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { TeamsService } from 'src/app/services/teams/teams.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent implements OnInit {
  @Input() taskId: number;
  @Output() confirm = new EventEmitter<boolean>();
  userL: LoginResponse = {};
  task: TaskRequest = {};
  statuss: Array<Status>;
  states: Array<State>;
  teams: Array<Team>;
  users: Array<User>;
  constructor(
    private statusService: StatusService,
    private stateService: StatesService,
    private teamService: TeamsService,
    private userService: UsersService,
    private taskService: TasksService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('userLogin')) {
      this.userL = JSON.parse(localStorage.getItem('userLogin'));
      this.findAllStatus();
      this.findAllStates();
      this.findAllUsers();
      if(this.userL.role.description == 'Administrador') {
        this.findAllTeams();
      } else {
        this.teams = [];
        this.teams.push(this.userL.team);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.taskId.currentValue == 0) {
      this.task = {};
    } else if(changes.taskId.previousValue != changes.taskId.currentValue) {
      this.task = {};
      this.taskService.findById(changes.taskId.currentValue).subscribe(
        success => {
          const task: Task = success.data;
          this.task.title = task.title;
          this.task.description = task.description;
          this.task.statusId = task.status.id;
          this.task.stateId = task.state.id;
          this.task.teamId = task.team.id;
          this.task.userAssignedId = task.userAssigned.id;
        }, error => {
          
        }
      )
    }
  }

  findAllStatus(): void {
    this.statusService.findAll().subscribe(
      success => {
        this.statuss = success.data;
      }, error => {
        
      }
    )
  }

  findAllStates(): void {
    this.stateService.findAll().subscribe(
      success => {
        this.states = success.data;
      }, error => {
        
      }
    )
  }

  findAllTeams(): void {
    this.teamService.findAll().subscribe(
      success => {
        this.teams = success.data;
      }, error => {
        
      }
    )
  }

  findAllUsers(): void {
    this.userService.findAll().subscribe(
      success => {
        this.users = success.data;
      }, error => {
        
      }
    )
  }

  save(): void {
    const r: boolean = window.confirm("¿Estás seguro(a) que deseas "+(this.taskId==0?"guardar":"actualizar")+" la información?");
    if(r) {
      this.toastService.info("Un momento, por favor ...", "¡Validando información!", constants.toastOptions);
      if(this.taskId == 0) {
        this.task.userCreatedEmail = this.userL.email;
        this.task.statusId = this.task.statusId?this.task.statusId:1; // Estado activo por defecto.
        this.saveTask(this.task);
      } else {
        this.updateTask(this.taskId, this.task);
      }
    }
  }

  saveTask(task: TaskRequest): void {
    this.taskService.save(task).subscribe(
      success => {
        this.toastService.clear();
        this.toastService.success("La tarea se ha guardado correctamente", "¡Guardado exitoso!", constants.toastOptions);
        document.getElementById('closeTaskModal').click();
        this.confirm.emit(true);
      }, error => {
        this.toastService.clear();
        if(error.error.status == 400) {
          let l: string = '<ul>';
          error.error.errors.forEach(e => {
            l = l+'<li>'+e+'</li>';  
          });
          l = l+'</ul>';
          this.toastService.error(l, error.error.message, constants.toastOptions);
        } else {
          this.toastService.error(error.error.message, "¡Operación fallida!", constants.toastOptions);  
        }
      }
    )
  }

  updateTask(id: number, task: TaskRequest): void {
    this.taskService.update(id, task).subscribe(
      success => {
        this.toastService.clear();
        this.toastService.success("La tarea se ha actualizado correctamente", "Actualización exitosa!", constants.toastOptions);
        document.getElementById('closeTaskModal').click();
        this.confirm.emit(true);
      }, error => {
        this.toastService.clear();
        if(error.error.status == 400) {
          let l: string = '<ul>';
          error.error.errors.forEach(e => {
            l = l+'<li>'+e+'</li>';  
          });
          l = l+'</ul>';
          this.toastService.error(l, error.error.message, constants.toastOptions);
        } else {
          this.toastService.error(error.error.message, "¡Operación fallida!", constants.toastOptions);  
        }
      }
    )
  }
}
