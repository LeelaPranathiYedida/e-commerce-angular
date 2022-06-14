import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  public productDetails?: ProductDetails;
  public totalItem:number=0;
  constructor(
    private api: ApiService,
    private cartService: CartService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.api.getProduct()
    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;

    })
    this.productDetails = history.state;
    console.log(this.productDetails);
  }
  addtocart(productDetails: ProductDetails) {
    this.cartService.addtoCart(this.productDetails);
    this.router.navigateByUrl('/cart', { state: productDetails });
  }


}
export interface ProductDetails {
  category: string;
  description: string;
  id: number;
  image: string;
  navigationId: number;
  price: number;
  quantity: number;
  rating: { rate: number; count: number };
  title: string;
  total: number;
}