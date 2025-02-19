import { CommonModule } from '@angular/common';
import { Component, EventEmitter, NgModule, OnInit, Output } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { CartComponent } from "../cart/cart.component";
import { Products } from '../../home/db_data';
import { FormsModule } from '@angular/forms';
import { EventEmit } from '../../event-hub';

@Component({
  selector: 'app-header',
  imports: [CommonModule, LoginComponent, CartComponent, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  openLoginModal = false;
  openCartModal = false;
  cartProduct : any[] = []

  isActive: boolean = false;

  searchText : any;
  products = Products;
  productsName: string[] = this.products.name;
  
  openModal(){

  }

  ngOnInit(): void {
    console.log(this.cartProduct)
    console.log(this.searchText)
  }

  handleInputChange(event: any) {
    // EventEmit('filterChange', event.target.value);
    const filterEvent = new CustomEvent("filterChange", {detail: event.target.value});
    document.dispatchEvent(filterEvent);
    console.log('input changed', event.target.value)
  }


  filterProduct(){
    return this.productsName.filter(name => name.toLowerCase().includes(this.searchText.toLowerCase()))
  }

  closeLoginForm() {
    console.log("3. close login form in header component")
    this.openLoginModal = false
  }

  toggleActive(state: boolean): void {
    this.isActive = state;
  }

}

