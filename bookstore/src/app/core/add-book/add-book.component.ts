import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IBook } from 'src/app/interface/book';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {

  constructor(private http:HttpClient) { }

  createForm = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    image: new FormControl(''),
  });

 books:IBook[]|null=null;
  
 
async onSubmit() {

  let book=<IBook>{
    title:this.createForm.controls['title'].value,
    author:this.createForm.controls['author'].value,
    description:this.createForm.controls['description'].value,
    price:Number(this.createForm.controls['price'].value),
    image:this.createForm.controls['image'].value,
  }

  const headers= new HttpHeaders().set('content-type', 'application/json');
  this.http.post<IBook>('http://localhost:3000/books',book, { 'headers': headers }).subscribe((res)=>{});
  this.createForm.reset();
  return;
}
}
