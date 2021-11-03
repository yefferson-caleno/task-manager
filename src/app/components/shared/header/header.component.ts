import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/models/login/login.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: LoginResponse = {};
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('userLogin')) {
      this.user = JSON.parse(localStorage.getItem('userLogin'));
    } else {
      this.router.navigate(['']);
    }
  }

  logout(): void {
    const r: boolean = window.confirm("¿Estás seguro(a) que deseas cerrar la sesión?");
    if(r) {
      localStorage.clear();
      window.location.href = '/';
    }
  }

}
