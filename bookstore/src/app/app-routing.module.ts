import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddBookComponent } from './core/add-book/add-book.component';
import { MainComponent } from './core/main/main.component';
import { ProfileComponent } from './core/profile/profile.component';
import { WelcomeComponent } from './core/welcome/welcome.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'logout',component:LogoutComponent},
  {path:'home',component:MainComponent},
  {path:'welcome',component:WelcomeComponent},
  {path:'profile',component:ProfileComponent},
  {path:'addBook',component:AddBookComponent},
  {path:'',component:WelcomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
