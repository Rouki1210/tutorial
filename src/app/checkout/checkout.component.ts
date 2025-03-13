import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { routes } from '../app.routes';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private http : HttpClient, fb : FormBuilder, private router : Router) { }

  ngOnInit() {
    this.loadCart();
    this.loadCountry();
    this.calculateTotal()
  }

  cartProduct : any[] = []
  country : any[] = []
  totalPrice : number = 0


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

  addOrder(){
    const orderData = {
      checkoutInfo: this.checkoutForm.value,
      orderItems: this.cartProduct,
    }
    this.http.post<any>('https://localhost:7086/api/Order', orderData).subscribe(
      (response) => {
        console.log('Order successfully', response)
        this.router.navigate(['/success']);
      }, error => {
        console.log(error)
      }      
    )
  }

  calculateTotal() {
    this.totalPrice = this.cartProduct.reduce((total, product) => total + (product.price * product.quantity), 0);
  }

  checkoutInfo(){
    this.addOrder()
    console.log(this.checkoutForm.value, this.cartProduct)
  }
}
