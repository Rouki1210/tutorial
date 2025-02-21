import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalComponent } from "../../components/modal/modal.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CommonModule, ModalComponent]
})
export class CartComponent implements OnInit {
  @Output() onClose = new EventEmitter();
  count = 1;

  cartProduct: any[] = []

  constructor() { }

  ngOnInit() {
    this.loadCart()
    console.log(this.cartProduct)
  }

  loadCart() {
    let cartData = localStorage.getItem('cartProduct');
    
    try {
      this.cartProduct = cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error("Error parsing cart data:", error);
      this.cartProduct = []; // Reset if data is corrupted
    }
  }

  handleClose() {
    this.onClose.emit();
  }

  increaseProduct(productId : number){
    this.count += 1;
  }

  decreaseProduct(productId : number){
    if(this.count <= 1){
      return;
    }
    this.count -= 1;
  }

  deleteProduct(productId : number){
    this.cartProduct = this.cartProduct.filter(product => product.id !== productId);
    localStorage.setItem('cartProduct', JSON.stringify(this.cartProduct));

  console.log('Updated cart after removal:', this.cartProduct);
  }
}
