import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthenticationGuard } from './services/authentication.guard';

const routes: Routes = [
  { //Route to redirect home page
    path: '',
    component: HomeComponent
  },
  { //Principal page
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthenticationGuard]
  },
  { //Login page
    path: 'login',
    component: LoginComponent
  },
  { //Chat page
    path: 'chat/:uid',
    component: ChatComponent
  },
  { //Profile person page
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //Our router SPA
  exports: [RouterModule]
})
export class AppRoutingModule { }
