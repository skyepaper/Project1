import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBook } from 'src/app/interface/book';
import { LoadingService } from 'src/app/service/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  loading$=this.loader.loading$;

  book:IBook|undefined;
  constructor(private http:HttpClient,
              private route: ActivatedRoute,
              public loader:LoadingService) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
  let bookIdFromRoute = Number(routeParams.get('bookId'));
 
  this.getBook(bookIdFromRoute);
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
  confirmPopUp(title:string){
    if(localStorage.getItem('token')){
      Swal.fire({
        title:`Add '${title}' to cart?`,
        showCancelButton:true,
        confirmButtonText:"Yes",
        cancelButtonText:"No"
      })
    }
    else{
      Swal.fire('Please login...');
    }
}
}
