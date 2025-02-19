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
  @Input() products : any[] = []
  count = 1;

  constructor() { }

  ngOnInit() {
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
    this.products = this.products.filter(product => product.id !== productId)
  }
}
