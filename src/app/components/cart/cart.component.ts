import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public products:any=[];
  public grandTotal !: number;
  public totalItem:number=0;

  constructor(private api:ApiService, private cartService:CartService,private router:Router) { }

  ngOnInit(): void {
    this.api.getProduct()
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;

    })
  }
  removeItem(item:any){
    this.cartService.removeCartItem(item);
  }
  emptyCart(){
    this.cartService.removeAllCart();
  }

}
