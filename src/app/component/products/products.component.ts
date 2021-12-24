import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import { WishListService } from 'src/app/service/wishlist.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MsgComponent } from '../msg/msg.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public productList : any ;
  public filterCategory : any
  searchKey:string ="";
  constructor(private api : ApiService, private cartService : CartService, private wishListService : WishListService, private dialogRef : MatDialog) { }

  ngOnInit(): void {
    this.productList = this.api.getProduct();
    this.productList.forEach((a:any) => {
      if(a.category ==="Business" || a.category ==="Business"){
        a.category ="fashion"
      }
      Object.assign(a,{quantity:1,total:a.price});
    });

    this.cartService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }
  addtocart(item: any){
    const dialogConfig = new MatDialogConfig();
    this.cartService.addtoCart(item);
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialogRef.open(MsgComponent, dialogConfig);
  }

  filter(category:string){
    this.filterCategory = this.productList
    .filter((a:any)=>{
      if(a.category == category || category==''){
        return a;
      }
    })
  }

  addtoWishList(item: any){
    this.wishListService.addtoWishList(item);
  }

}
