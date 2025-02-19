import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ModalComponent } from '../../app/components/modal/modal.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-addProduct',
  templateUrl: './addProduct.component.html',
  imports: [CommonModule, ModalComponent, ReactiveFormsModule],
  styleUrls: ['./addProduct.component.css']
})
export class AddProductComponent implements OnInit {

  @Output() onClose = new EventEmitter();
  
  productForm : FormGroup = new FormGroup({
    id: new FormControl(0),
    productName: new FormControl('', Validators.required),
    quantity: new FormControl(0, Validators.required),
    price: new FormControl(0, Validators.required),
    imageProduct: new FormControl('', Validators.required)
  })
  
  constructor() {

  }
    
  
  ngOnInit() {
      
  }

  // createForm(){
  //   this.productFrom = new FormGroup({
  //     id: new FormControl(0),
  //     productName: new FormControl('', Validators.required),
  //     quantity: new FormControl(0, Validators.required),
  //     price: new FormControl(0, Validators.required),
  //     imageProduct: new FormControl('', Validators.required)
  //   })
  // }

  addData(){
      fetch(`http://localhost:5187/api/Product/`, {
        method: 'POST',
        headers: {
          "Accept": "text/plain",
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.productForm.value)
      })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json(); // Assuming the API returns a response body
      })
      .then(data => {
        console.log('Add a new product successful:', data);
      })
      .catch(err => {
        console.error('Error adding data:', err);
      });
    }

  addProduct(){
    this.addData()
    console.log(this.productForm.value)
    this.onClose.emit()
  }
    
  handleClose() {
    this.onClose.emit();
  }

}
