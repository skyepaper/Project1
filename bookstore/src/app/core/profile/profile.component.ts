import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IUser } from 'src/app/interface/user';
import { IBook } from 'src/app/interface/book';
import { LoadingService } from 'src/app/service/loading.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loading$=this.loader.loading$;
  editFlag:boolean=false;

  user:IUser|undefined;
  
  constructor(private http:HttpClient,public loader:LoadingService) { }

  editForm = new FormGroup({
    image: new FormControl(''),
    email: new FormControl(''),
  });

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
   this.user=JSON.parse(localStorage.getItem('user')!);
  }
  edit(){
    this.editFlag=true;
  }
  save(){
    let image=this.editForm.controls['image'].value;
    let email=this.editForm.controls['email'].value;

   let editUser=<IUser>{
    id:this.user?.id!,
    username: this.user?.username!,
    password: this.user?.password!,
    email:email,
    image:image,
    cart:this.user?.cart!
   }

    const headers= new HttpHeaders().set('content-type', 'application/json');
    this.http.put<IUser>(`http://localhost:3000/users/${this.user?.id}`,editUser).subscribe({
      next:(value)=>{
        this.user=value;
        headers:headers;
      }});
      this.editFlag=false;
  }

}
