import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IBook } from 'src/app/interface/book';
import { IUser } from 'src/app/interface/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router:Router,private http:HttpClient) {}
   
public errorMessage:string='';
  
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  
  users:IUser[]|null=null;
  
 
async onSubmit() {

  let user=<IUser>{
    username:this.loginForm.controls['username'].value,
    password:this.loginForm.controls['password'].value
  }
  const headers= new HttpHeaders().set('content-type', 'application/json');
  await this.http.get<IUser[]>('http://localhost:3000/users').subscribe({
      next:(value)=>{
        this.users=value;
        headers:headers;
      }});
     
     setTimeout(() => console.log(this.users),1000);
        
   
  if(!(user.username && user.password)){
    this.errorMessage='All fields required';
    return;
  }
    if(this.users?.find(u=>u.username===user.username)==undefined){
    this.errorMessage="Username is not registered";
    return;
  }
  if(user.username.length<5 || user.password.length<5){
    this.errorMessage="All fields at least 5char";
    return;
  }
  
  let findUser=this.users?.find(u=>u.username===user.username);
  if(user.password!==findUser?.password){
    this.errorMessage="Password is not correct";
    return;
  }
  

  let token=Math.floor(Math.random()*10000).toString();
  localStorage.setItem('token',token);
 
  this.http.get<IUser>(`http://localhost:3000/users/${findUser.id}`, { 'headers': headers }).subscribe((res)=>{localStorage.setItem('user',JSON.stringify(res));});

  this.router.navigate(['/welcome']);
  return;
}
}
