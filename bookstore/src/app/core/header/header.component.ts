import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interface/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  user:IUser|null=null;
  constructor() { }

  readLocalStorageValue(key:string) {
    return localStorage.getItem(key);
}
getUsername(){
  this.user=JSON.parse(localStorage.getItem('user')!);
  return this.user?.username;
 }
}
