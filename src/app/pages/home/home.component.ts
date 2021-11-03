import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/models/login/login.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
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
  }

}
