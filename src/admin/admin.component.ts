import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DeleteProductComponent } from './deleteProduct/deleteProduct.component';
import { EditProductComponent } from './editProduct/editProduct.component';
import { AddProductComponent } from './addProduct/addProduct.component'
import { HttpClient } from '@angular/common/http';
import { AddOrderComponent } from './addOrder/addOrder.component';
import { DeleteOrderComponent } from './deleteOrder/deleteOrder.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  imports: [CommonModule, DeleteProductComponent, EditProductComponent, AddProductComponent, AddOrderComponent, DeleteOrderComponent],
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  constructor(private http : HttpClient) { }
  
  ngOnInit() {
    this.fetchData()
    this.loadOrder()
  }
  
  isSingleClick: Boolean = true;     
  openDeleteModal = false;
  openEditModal = false;
  openAddModal = false;
  openAddOrderModal = false;
  currentProduct : number = 0;
  editProduct : any = []
  orders : any[] = []

  products : any[] = []

  loadOrder(){
    this.http.get<any>('https://localhost:7086/api/Order').subscribe(
      (response) => {
        console.log("API Response:", response);  // Debugging
      this.orders = response;  // Adjust based on actual API response
      console.log("Orders:", this.orders);
      },      
      (error) => {
        console.error("Error loading country data:", error);
      }
    )
  }

  fetchData(){
    fetch('http://localhost:5187/api/product', {
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
  sortProductIdAsc(){
    this.isSingleClick = true;
    setTimeout(()=>{
        if(this.isSingleClick){
          this.products = this.products.sort((a : any, b : any) => a.id - b.id);
        }
    },250)
  }

  sortProductIdDesc(){
    this.isSingleClick = false;
    this.products = this.products.sort((a : any, b : any) => b.id - a.id )
  }


method1CallForClick(){
  this.isSingleClick = true;
        setTimeout(()=>{
            if(this.isSingleClick){
              this.products.sort((a: any, b: any) => 
                (a.productName || '').localeCompare(b.productName || '')
              );
            }
        },250)
}
method2CallForDblClick(){
        this.isSingleClick = false;
        this.products.sort((a: any, b: any) => 
          (b.productName || '').localeCompare(a.productName || '')
        );
}

  updateProduct(product : any){
    this.openEditModal = true
    console.log(product)
    this.editProduct = product
  }
  
  deleteProduct(productId : any){
    this.openDeleteModal = true
    this.currentProduct = productId
  }

  deleteOrder(orderId : any){
    this.openDeleteModal = true
    this.currentProduct = orderId
  }

  addProduct(){
    this.openAddModal = true
  }

  closeAddModal(){
    this.openAddModal = false,
    this.fetchData()
  }
}
