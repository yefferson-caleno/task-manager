import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';
import { constants } from 'src/app/global/constants';
import { Task, TaskRequest } from 'src/app/models/tasks/tasks.model';
import { TasksService } from 'src/app/services/tasks/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  taskId: number;
  tasks: Array<Task>;
  constructor(
    private taskService: TasksService,
    private toastService: ToastService,
    private router: Router
  ) { }


  ngOnInit(): void {
    if(!localStorage.getItem('userLogin')) {
      this.router.navigate(['']);
    }
    this.findAllTasks();
  }

  findAllTasks(): void {
    this.taskService.findAll().subscribe(
      success => {
        this.tasks = success.data;
      }, error => {

      }
    )
  }

  onConfirm(e: boolean):void {
    if (e) {
      this.tasks = null;
      this.taskId = 0;
      this.findAllTasks();
    }
  }

  delete(id: number): void {
    const r: boolean = window.confirm("¿Estás seguro(a) que deseas inactivar la tarea?");
    if(r) {
      const task: TaskRequest =  {
        statusId: 2
      }
      this.updateTask(id, task);
    }
  }

  updateTask(id: number, task: TaskRequest): void {
    this.taskService.update(id, task).subscribe(
      success => {
        this.toastService.success("La tarea se ha inactivado correctamente", "¡Actualización exitosa!", constants.toastOptions);
        this.onConfirm(true);
      }, error => {
        console.log(error);
        if(error.error.status == 400) {
          let l: string = '<ul>';
          error.error.errors.forEach(e => {
            l = l+'<li>'+e+'</li>';  
          });
          l = l+'</ul>';
          this.toastService.error(l, error.error.message, constants.toastOptions);
        }
      }
    )
  }


}
