import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';
import { constants } from 'src/app/global/constants';
import { LoginResponse } from 'src/app/models/login/login.model';
import { Team, TeamRequest } from 'src/app/models/teams/team.model';
import { TeamsService } from 'src/app/services/teams/teams.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  teamId: number;
  teams: Array<Team>;
  constructor(
    private teamService: TeamsService,
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
    this.findAllTeams();
  }

  findAllTeams(): void {
    this.teamService.findAll().subscribe(
      success => {
        this.teams = success.data;
      }, error => {

      }
    )
  }

  onConfirm(e: boolean):void {
    if (e) {
      this.teams = null;
      this.teamId = 0;
      this.findAllTeams();
    }
  }

  delete(id: number): void {
    const r: boolean = window.confirm("¿Estás seguro(a) que deseas inactivar el equipo?");
    if(r) {
      const team: TeamRequest =  {
        statusId: 2
      }
      this.updateTeam(id, team);
    }
  }

  updateTeam(id: number, team: TeamRequest): void {
    this.teamService.update(id, team).subscribe(
      success => {
        this.toastService.success("El equipo se ha inactivado correctamente", "¡Actualización exitosa!", constants.toastOptions);
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
