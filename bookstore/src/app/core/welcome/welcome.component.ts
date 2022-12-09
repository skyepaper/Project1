import { Component } from '@angular/core';
import { IUser } from 'src/app/interface/user';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent  {
  user:IUser|null=null;
  constructor() { }

  getUsername(){
    this.user=JSON.parse(localStorage.getItem('user')!);
    return this.user?.username;
   }
 
  }


