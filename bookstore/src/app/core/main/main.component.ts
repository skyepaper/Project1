import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IBook } from 'src/app/interface/book';
import { IUser } from 'src/app/interface/user';
import { LoadingService } from 'src/app/service/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  loading$=this.loader.loading$;
  user:IUser|null=null;

  public books:IBook[]=[];
  public searchBooks:IBook[]=[];
  public booksCart:IBook[]=[];
  
  searchFlag:boolean=false;
  searchForm=new FormGroup({
    searchWord:new FormControl('')
  })

  constructor(private http:HttpClient,public loader:LoadingService,private router:Router) { }

  ngOnInit(): void {
    this.getBooks();
    this.getUser();
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

  getUser(){
    this.user=JSON.parse(localStorage.getItem('user')!);
  }

  search(){
    
    let searchWord=this.searchForm.controls['searchWord'].value?.toLowerCase()!;
    
      this.searchBooks=this.books?.filter(
        b=>
          b.author.toLowerCase().includes(searchWord) || 
          b.title.toLowerCase().includes(searchWord)
        );
        this.searchFlag=true;
        return ;
  }

  confirmPopUp(title:string,price:number){
    if(localStorage.getItem('token')){
      Swal.fire({
        title:`Add '${title}' to cart?`,
        showCancelButton:true,
        confirmButtonText:"Yes",
        cancelButtonText:"No"
      }).then((res)=>{
        if(res.value){

          let bookToBuy=<IBook>{
            title:title,
            price:price
          }
          this.buyBook(bookToBuy);
          this.router.navigate(['/profile']);
        }
      })
    }
    else{
      Swal.fire('Please login...');
    }
    
     
  }

  buyBook(book:IBook){
    this.booksCart=this.user?.cart!;
    this.booksCart?.push(book)!;
    
    let editUser=<IUser>{
      id:this.user?.id,
      username:this.user?.username,
      password:this.user?.password,
      email:this.user?.email,
      image:this.user?.image,
      cart:this.booksCart
     }
     const headers= new HttpHeaders().set('content-type', 'application/json');
    this.http.put<IUser>(`http://localhost:3000/users/${this.user?.id}`,editUser).subscribe({
      next:(value)=>{
        this.user=value;
        headers:headers;
      }});
      localStorage.setItem('user',JSON.stringify(editUser));
  }

    }
