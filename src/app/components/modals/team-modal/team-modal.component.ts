import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ToastService } from 'ng-uikit-pro-standard';
import { constants } from 'src/app/global/constants';
import { Status } from 'src/app/models/status/status.model';
import { Team, TeamRequest } from 'src/app/models/teams/team.model';
import { StatusService } from 'src/app/services/status/status.service';
import { TeamsService } from 'src/app/services/teams/teams.service';

@Component({
  selector: 'app-team-modal',
  templateUrl: './team-modal.component.html',
  styleUrls: ['./team-modal.component.scss']
})
export class TeamModalComponent implements OnInit {
  @Input() teamId: number;
  @Output() confirm = new EventEmitter<boolean>();
  team: TeamRequest = {};
  statuss: Array<Status>;
  constructor(
    private teamService: TeamsService,
    private statusService: StatusService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.findAllStatus();
  }        
      
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.teamId.currentValue == 0) {
      this.team = {};
    } else if(changes.teamId.previousValue != changes.teamId.currentValue) {
      this.team = {};
      this.teamService.findById(changes.teamId.currentValue).subscribe(
        success => {
          const team: Team = success.data;
          this.team.description = team.description;
          this.team.statusId = team.status.id;
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

  save(): void {
    const r: boolean = window.confirm("¿Estás seguro(a) que deseas "+(this.teamId==0?"guardar":"actualizar")+" la información?");
    if(r) {
      if(this.teamId == 0) {
        this.saveTeam(this.team);
      } else {
        this.updateTeam(this.teamId, this.team);
      }
    }
  }

  saveTeam(team: TeamRequest): void {
    this.teamService.save(team).subscribe(
      success => {
        this.toastService.success("El equipo se ha guardado correctamente", "¡Guardado exitoso!", constants.toastOptions);
        document.getElementById('closeTeamModal').click();
        this.confirm.emit(true);
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

  updateTeam(id: number, team: TeamRequest): void {
    this.teamService.update(id, team).subscribe(
      success => {
        this.toastService.success("El equipo se ha actualizado correctamente", "Actualización exitosa!", constants.toastOptions);
        document.getElementById('closeTeamModal').click();
        this.confirm.emit(true);
      }, error => {
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
