import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { WishListService } from 'src/app/service/wishlist.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MsgComponent } from '../msg/msg.component';
@Component({
  selector: 'app-cart',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishListComponent implements OnInit {

  public products : any = [];
  public grandTotal !: number;
  constructor(private wishListService : WishListService, private cartService : CartService, private dialogRef : MatDialog) { }

  ngOnInit(): void {
    this.wishListService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.wishListService.getTotalPrice();
    })
  }
  removeItem(item: any){
    this.wishListService.removeWishListItem(item);
  }
  emptycart(){
    this.wishListService.removeAllWishList();
  }

  addtocart(item: any){
    const dialogConfig = new MatDialogConfig();

    this.cartService.addtoCart(item);
    this.wishListService.removeWishListItem(item);
    
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialogRef.open(MsgComponent, dialogConfig);
  }

}
