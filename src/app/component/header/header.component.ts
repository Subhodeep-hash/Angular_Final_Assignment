import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { WishListService } from 'src/app/service/wishlist.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public totalItemCart : number = 0;
  public totalItemWishlist : number =0;
  public searchTerm !: string;
  constructor(private cartService : CartService, private wishlist : WishListService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItemCart = res.length;
    })
    this.wishlist.getProducts().subscribe(resW => {
      this.totalItemWishlist = resW.length;
    })
  }
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }
}
