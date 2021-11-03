import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';
import { constants } from 'src/app/global/constants';
import { LoginResponse } from 'src/app/models/login/login.model';
import { User, UserRequest } from 'src/app/models/users/users.model';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userId: number;
  users: Array<User>;
  constructor(
    private userService: UsersService,
    private toastService: ToastService,
    private router: Router
  ) { }


  ngOnInit(): void {
    if(localStorage.getItem('userLogin')) {
      const user:LoginResponse = JSON.parse(localStorage.getItem('userLogin'));
      if (user.role.id != 1) {
        this.router.navigate(['tasks']);
      }
    } else {
      this.router.navigate(['']);
    }
    this.findAllUsers();
  }

  findAllUsers(): void {
    this.userService.findAll().subscribe(
      success => {
        this.users = success.data;
      }, error => {

      }
    )
  }

  onConfirm(e: boolean):void {
    if (e) {
      this.users = null;
      this.userId = 0;
      this.findAllUsers();
    }
  }

  delete(id: number): void {
    const r: boolean = window.confirm("¿Estás seguro(a) que deseas inactivar el usuario?");
    if(r) {
      const user: UserRequest =  {
        statusId: 2
      }
      this.updateUser(id, user);
    }
  }

  updateUser(id: number, user: UserRequest): void {
    this.userService.update(id, user).subscribe(
      success => {
        this.toastService.success("El usuario se ha inactivado correctamente", "¡Actualización exitosa!", constants.toastOptions);
        this.onConfirm(true);
      }, error => {
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
