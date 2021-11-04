import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';
import { constants } from 'src/app/global/constants';
import { LoginRequest, LoginResponse } from 'src/app/models/login/login.model';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  login: LoginRequest = {};
  constructor(
    private loginService: LoginService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('userLogin')) {
      const userL: LoginResponse = JSON.parse(localStorage.getItem('userLogin'));
      if(userL.role.id == 1) {
        this.router.navigate(['home']);
      } else {
        this.router.navigate(['tasks']);
      }
    }
  }

  auth(): void {
    this.toastService.info("Un momento, por favor ...", "¡Validando información!", constants.toastOptions);
    this.loginService.login(this.login).subscribe(
      success => {
        let userLogin: LoginResponse = success.data; 
        let userName: Array<string> = userLogin.name.split(" ");
        userLogin.name = (userName.length>1)? userName[0]+" "+userName[1]:userName[0]; 
        localStorage.setItem('userLogin', JSON.stringify(userLogin));
        this.toastService.clear();
        this.toastService.success("Bienvenido(a): "+userLogin.name, "¡Datos correctos!", constants.toastOptions);
        setTimeout(()=> {
          if(userLogin.role.id == 1) {
            window.location.href = '/home';
          } else {
            window.location.href = '/tasks';
          }
        }, 2000);
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
