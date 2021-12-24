import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  public wishlistItemList : any =[]
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor() { }
  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product : any){
    this.wishlistItemList.push(...product);
    this.productList.next(product);
  }
  addtoWishList(product : any){
    this.wishlistItemList.map((a:any, index:any)=>{
      if(product.id === a.id){
        console.log("Need to be remove");
        this.removeWishListItem(product);
      }
    })
    this.wishlistItemList.push(product);
    this.productList.next(this.wishlistItemList);
    this.getTotalPrice();
    console.log(this.wishlistItemList)
  }
  getTotalPrice() : number{
    let grandTotal = 0;
    this.wishlistItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }
  removeWishListItem(product: any){
    this.wishlistItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.wishlistItemList.splice(index,1);
      }
    })
    this.productList.next(this.wishlistItemList);
  }
  removeAllWishList(){
    this.wishlistItemList = []
    this.productList.next(this.wishlistItemList);
  }
}
