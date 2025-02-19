import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Products } from './db_data';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../layout/pagination/pagination.component';
import { HttpClient } from '@angular/common/http';
import { EventSubscribe } from '../event-hub';
import { retry } from 'rxjs';
import { CartComponent } from '../layout/cart/cart.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, PaginationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent implements OnInit{
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.updateDisplayedProducts();
    this.fetchData()

    // Listen for the event.
    document.addEventListener(
      "filterChange",
      (e: any) => {
        this.searchText = e.detail
        console.log("Search Text", this.searchText)
        this.searchData()
      },
      false,  
    );
    // EventSubscribe('filterChange', (param : any) => {
    //   console.log('filter changed', param)
    // })
  }

  products : any[] = []
  cartProduct = []
  searchText : string = ''
  searchProduct : any[] = []

  fetchData(){
    fetch('http://localhost:5187/api/Product', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => {
      if(!res.ok){
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json()
    })
    .then(data => {
      this.products = data;
    })
    .catch(err => {
      console.error('Error fetching data:', err);
    })
  }
  searchData(){
    fetch(`http://localhost:5187/api/Product/product?productName=${encodeURIComponent(this.searchText)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => {
      if(!res.ok){
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json()
    })
    .then(data => {
      this.products = data
    })
    // .catch(err => {
    //   console.error('Error fetching data:', err);
    // })
  }

  displayedProducts = [this.products]
  currentPage: number = 1
  limit : number = 8

  onSortChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;

    switch (selectedValue) {
      case 'a-z':
        this.sortProductsAsc();
        break;
      case 'z-a':
        this.sortProductsDesc();
        break;
      case 'price-asc':
        this.sortPriceDesc();
        break;
      case 'price-desc':
        this.sortPriceAsc();
        break;
      default:
        break;
    }
  }
  
  sortPriceDesc() {
    this.products = this.products.sort((a : any, b : any) => a.price - b.price);
  }

  sortPriceAsc() {
    this.products = this.products.sort((a: any, b : any) => b.price - a.price);
  } 

  sortProductsAsc(){
    this.products.sort((a: any, b: any) => 
      (a.productName || '').localeCompare(b.productName || '')
    );
  }

  sortProductsDesc(){
    this.products.sort((a: any, b: any) => 
      (b.productName || '').localeCompare(a.productName || '')
    );
  }

  updateDisplayedProducts() {
    const startIndex = (this.currentPage - 1) * this.limit;
    const endIndex = startIndex + this.limit;
  }

  addtoCart(product : any){
    if (!this.cartProduct) {
      this.cartProduct = []; // Initialize cart if it doesn't exist
    }
  
    product = this.cartProduct// Add the selected product to the cart
    console.log('Product added to cart:', product);
    console.log('Current cart:', this.cartProduct);
  }

  // searchProduct(){
  //   if (this.searchText.trim() === '') {
  //     // If searchText is empty, display all products
  //     this.updateDisplayedProducts();
  //     return;
  //   }
  
  //   const lowercasedSearchText = this.searchText.toLowerCase();
  
  //   // Filter products by search text
  //   this.displayedProducts = this.products.filter(product => 
  //     product.name.toLowerCase().includes(lowercasedSearchText) ||
  //     product.description?.toLowerCase().includes(lowercasedSearchText)
  //   );
  
  // }
}