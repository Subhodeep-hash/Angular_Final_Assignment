import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MsgComponent } from '../msg/msg.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products : any = [];
  public grandTotal !: number;
  constructor(private cartService : CartService, private dialogRef : MatDialog) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }
  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    const dialogConfig = new MatDialogConfig();
    this.cartService.removeAllCart();
  }
  emptycartPerchase(){
    const dialogConfig = new MatDialogConfig();
    this.cartService.removeAllCart();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialogRef.open(MsgComponent, dialogConfig);
  }

}
