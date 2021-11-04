import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ToastService } from 'ng-uikit-pro-standard';
import { constants } from 'src/app/global/constants';
import { Role } from 'src/app/models/roles/roles.model';
import { Status } from 'src/app/models/status/status.model';
import { Team } from 'src/app/models/teams/team.model';
import { User, UserRequest } from 'src/app/models/users/users.model';
import { RolesService } from 'src/app/services/roles/roles.service';
import { StatusService } from 'src/app/services/status/status.service';
import { TeamsService } from 'src/app/services/teams/teams.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {
  @Input() userId: number;
  @Output() confirm = new EventEmitter<boolean>();
  user: UserRequest = {};
  statuss: Array<Status>;
  roles: Array<Role>;
  teams: Array<Team>;
  password: string; 
  passConfirm: string;
  constructor(
    private statusService: StatusService,
    private roleService: RolesService,
    private teamService: TeamsService,
    private userService: UsersService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.findAllStatus();
    this.findAllRoles();
    this.findAllTeams();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.userId.currentValue == 0) {
      this.user = {};
      this.password = null;
      this.passConfirm = null;
    } else if(changes.userId.previousValue != changes.userId.currentValue) {
      this.user = {};
      this.password = null;
      this.passConfirm = null;
      this.userService.findById(changes.userId.currentValue).subscribe(
        success => {
          const user: User = success.data;
          this.user.name = user.name;
          this.user.email = user.email;
          this.user.statusId = user.status.id;
          this.user.roleId = user.role.id;
          this.user.teamId = user.team.id;
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

  findAllRoles(): void {
    this.roleService.findAll().subscribe(
      success => {
        this.roles = success.data;
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

  save(): void {
    const r: boolean = window.confirm("¿Estás seguro(a) que deseas "+(this.userId==0?"guardar":"actualizar")+" la información?");
    if(r) {
      this.toastService.info("Un momento, por favor ...", "¡Validando información!", constants.toastOptions);
      if(this.userId == 0) {
        if (this.password != null && this.passConfirm != null && this.password == this.passConfirm) {
          this.user.password = this.password;
        }
        this.saveUser(this.user);
      } else {
        if((this.password !=null || this.passConfirm != null) && (this.password != this.passConfirm)) {
          this.toastService.error("Las contraseñas deben coincidir", "¡Parámetros invalidos!", constants.toastOptions);
          return
        } else if (this.password != null && this.password == this.passConfirm) {
          this.user.password = this.password;
        }
        this.updateUser(this.userId, this.user);
      }
    }
  }

  saveUser(user: UserRequest): void {
    this.userService.save(user).subscribe(
      success => {
        this.toastService.clear();
        this.toastService.success("El usuario se ha guardado correctamente", "¡Guardado exitoso!", constants.toastOptions);
        document.getElementById('closeUserModal').click();
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

  updateUser(id: number, user: UserRequest): void {
    this.userService.update(id, user).subscribe(
      success => {
        this.toastService.clear();
        this.toastService.success("El usuario se ha actualizado correctamente", "Actualización exitosa!", constants.toastOptions);
        document.getElementById('closeUserModal').click();
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
