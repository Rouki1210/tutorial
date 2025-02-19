import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DeleteProductComponent } from './deleteProduct/deleteProduct.component';
import { EditProductComponent } from './editProduct/editProduct.component';
import { AddProductComponent } from './addProduct/addProduct.component'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  imports: [CommonModule, DeleteProductComponent, EditProductComponent, AddProductComponent],
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  constructor() { }
  
  ngOnInit() {
    this.fetchData()
  }
  
  isSingleClick: Boolean = true;     
  openDeleteModal = false;
  openEditModal = false;
  openAddModal = false;
  currentProduct : number = 0;
  editProduct : any = []

  products : any[] = []

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
    this.editProduct = product
  }
  
  deleteProduct(productId : any){
    this.openDeleteModal = true
    this.currentProduct = productId
    console.log(productId)
  }

  addProduct(){
    this.openAddModal = true
  }

}
