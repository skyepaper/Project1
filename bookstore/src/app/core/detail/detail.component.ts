import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBook } from 'src/app/interface/book';
import { IUser } from 'src/app/interface/user';
import { LoadingService } from 'src/app/service/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  loading$=this.loader.loading$;
  user:IUser|null=null;
  public booksCart:IBook[]=[];

  book:IBook|undefined;
  constructor(private http:HttpClient,
              private route: ActivatedRoute,
              public loader:LoadingService,
              private router:Router) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
  let bookIdFromRoute = Number(routeParams.get('bookId'));
 
  this.getBook(bookIdFromRoute);
  this.getUser();
  }
  getBook(id:number){
    const headers= new HttpHeaders().set('content-type', 'application/json');
    this.http.get<IBook>(`http://localhost:3000/books/${id}`).subscribe({
      next:(value)=>{
        this.book=value;
        headers:headers;
      }});
      return this.book;
  }
  getUser(){
    this.user=JSON.parse(localStorage.getItem('user')!);
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
