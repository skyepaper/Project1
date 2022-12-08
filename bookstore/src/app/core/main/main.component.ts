import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, switchMap } from 'rxjs';
import { IBook } from 'src/app/interface/book';
import { LoadingService } from 'src/app/service/loading.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  loading$=this.loader.loading$;
  searchFlag:boolean=false;
  searchForm=new FormGroup({
    searchWord:new FormControl('')
  })

  constructor(private http:HttpClient,public loader:LoadingService,private router:Router) { }
  
  public books:IBook[]=[];
  public searchBooks:IBook[]=[];
  
  ngOnInit(): void {
   this.getBooks();
   this.searchBooks=[];
  }

  getBooks(){
   
    const headers= new HttpHeaders().set('content-type', 'application/json');
   this.http.get<IBook[]>(`http://localhost:3000/books`)
    .subscribe({
      next:(value)=>{
        this.books=value;
        headers:headers;
      }});
      return this.books;
  }
  
  search(){
    
    let searchWord=this.searchForm.controls['searchWord'].value?.toLowerCase()!;
    
      this.searchBooks=this.books?.filter(
        b=>
          b.author.toLowerCase().includes(searchWord) || 
          b.title.toLowerCase().includes(searchWord)
        );
        this.searchFlag=true;
        console.log(this.searchBooks);
        return ;
  }

    }
