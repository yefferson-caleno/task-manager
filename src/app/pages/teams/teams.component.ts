import { Component, OnInit } from '@angular/core';
import { ToastService } from 'ng-uikit-pro-standard';
import { constants } from 'src/app/global/constants';
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
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
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
