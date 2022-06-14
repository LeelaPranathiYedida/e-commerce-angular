import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  login:any=FormGroup;
  public productList : any;
  public filterCategory:any;
  public totalItem:number=0;
  public searchTerm :string='';
   searchKey:string ="";

  constructor(private api:ApiService, 
              private cartService:CartService,
              private router:Router) { }

  ngOnInit(): void {
  
    this.api.getProduct()
    .subscribe(res=>{
      this.productList = res;
      this.filterCategory=res;
      this.productList.forEach((a:any)=> {
        if(a.category==="men's clothing" || a.category==="women's clothing"){
          a.category="fashion";
        }
        Object.assign(a,{quantity:1,total:a.price}); 
        
      });
      console.log(this.productList)
    })
    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;

    })
  }
  addtocart(item:any){
    this.cartService.addtoCart(item);
    this.router.navigate(['cart'])

  }

  viewProductDetails(item: any) {
    this.router.navigateByUrl('/product-details', { state: item });
  }
  search(event:any){
    this.searchTerm=(event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.searchKey=this.searchTerm;
  }
  filter(category:string){
    this.filterCategory=this.productList
    .filter((a:any)=>{
      if(a.category==category || category=='')
      {
        return a;
      }
    })
  }


  
}

