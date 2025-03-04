import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  imports: [CommonModule],
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private http : HttpClient) { }

  ngOnInit() {
    this.loadCart();
    this.loadCountry();
    console.log(this.cartProduct)
  }

  cartProduct : any[] = []
  country : any[] = []

  loadCountry() {
    this.http.get<any>('https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1')
      .subscribe(
        (response) => {
          this.country = response?.data?.data || [];
          console.log("Loaded countries:", this.country);
        },
        (error) => {
          console.error("Error loading country data:", error);
        }
      );
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
}
