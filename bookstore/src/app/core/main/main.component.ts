import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { IBook } from 'src/app/interface/book';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private http:HttpClient) { }
  books:IBook[]|null=null;
  
  ngOnInit(): void {
   this.getBooks();
  }

  getBooks(){
    const headers= new HttpHeaders().set('content-type', 'application/json');
    this.http.get<IBook[]>('http://localhost:3000/books').subscribe({
      next:(value)=>{
        this.books=value;
        headers:headers;
      }});
      return this.books;
  }
  

    }
