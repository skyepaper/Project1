import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  constructor() { }

  readLocalStorageValue(key:string) {
    return localStorage.getItem(key);
}
getUsername(){
  return localStorage.getItem('user');
 }
}
