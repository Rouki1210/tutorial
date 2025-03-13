import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalComponent } from "../../components/modal/modal.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CheckoutComponent } from '../../checkout/checkout.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CommonModule, ModalComponent]
})
export class CartComponent implements OnInit {
  @Output() onClose = new EventEmitter();


  cartProduct: any[] = []

  constructor(private router: Router) { }

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

  addToCart(){
    this.router.navigate(['/checkout']);
    this.onClose.emit()
  }

  handleClose() {
    this.onClose.emit();
  }

  increaseProduct(productId : number){
    console.log(this.cartProduct)
  }

  decreaseProduct(productId : number){

  }

  deleteProduct(productId : number){
    this.cartProduct = this.cartProduct.filter(product => product.id !== productId);
    localStorage.setItem('cartProduct', JSON.stringify(this.cartProduct));

  console.log('Updated cart after removal:', this.cartProduct);
  }
}
