import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private http : HttpClient, fb : FormBuilder) { }

  ngOnInit() {
    this.loadCart();
    this.loadCountry();
  }

  cartProduct : any[] = []
  country : any[] = []

  checkoutForm : FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10-12}$')]),
    address: new FormControl('', Validators.required),
  })

  loadCountry() {
    this.http.get<any>('https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1')
      .subscribe(
        (response) => {
          this.country = response?.data?.data || [];
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

  checkoutInfo(){
    console.log(this.checkoutForm.value, this.cartProduct)
  }
}
