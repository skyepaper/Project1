import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { IBook } from 'src/app/interface/book';
import { LoadingService } from 'src/app/service/loading.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  loading$=this.loader.loading$;

  constructor(private http:HttpClient,public loader:LoadingService) { }
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
