import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ModalComponent } from '../../app/components/modal/modal.component';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-editProduct',
  templateUrl: './editProduct.component.html',
  imports: [CommonModule, ModalComponent, ReactiveFormsModule],
  styleUrls: ['./editProduct.component.css']
})
export class EditProductComponent implements OnInit {

  @Output() onClose = new EventEmitter();
  @Input() product: any;
  productForm!: FormGroup;

  constructor() {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.productForm = new FormGroup({
      id: new FormControl({ value: this.product?.id, disabled: true }),
      productName: new FormControl(this.product?.productName, Validators.required),
      quantity: new FormControl(this.product?.quantity, Validators.required),
      price: new FormControl(this.product?.price, Validators.required),
      imageProduct: new FormControl(this.product?.imageProduct, Validators.required)
    });
  }

async updateProduct() {
    if (this.productForm.valid) {
      const updatedProduct = { ...this.product, ...this.productForm.getRawValue() };
      try {
        const response = await fetch('http://localhost:5187/api/Product', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedProduct)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        this.onClose.emit();
      } catch (error) {
        console.error('Error updating data:', error);
      }
    }
  }

  handleClose() {
    this.onClose.emit();
  }
}