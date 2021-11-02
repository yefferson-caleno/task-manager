import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { TeamModalComponent } from './components/modals/team-modal/team-modal.component';
import { UsersComponent } from './pages/users/users.component';
import { UserModalComponent } from './components/modals/user-modal/user-modal.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TaskModalComponent } from './components/modals/task-modal/task-modal.component';
import { AuthComponent } from './components/auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    TeamsComponent,
    TeamModalComponent,
    UsersComponent,
    UserModalComponent,
    TasksComponent,
    TaskModalComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
