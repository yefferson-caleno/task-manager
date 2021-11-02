import { Component, OnInit } from '@angular/core';
import { ToastService } from 'ng-uikit-pro-standard';
import { constants } from 'src/app/global/constants';
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
    private toastService: ToastService
  ) { }


  ngOnInit(): void {
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
