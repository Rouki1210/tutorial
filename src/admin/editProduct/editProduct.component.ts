import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ModalComponent } from '../../app/components/modal/modal.component';
import { FormControl, FormGroup, ReactiveFormsModule, ValueChangeEvent } from '@angular/forms';

@Component({
  selector: 'app-editProduct',
  templateUrl: './editProduct.component.html',
  imports: [CommonModule, ModalComponent, ReactiveFormsModule],
  styleUrls: ['./editProduct.component.css']
})
export class EditProductComponent implements OnInit {

  @Output() onClose = new EventEmitter();
  @Input() product : any = [];
    
  productForm : FormGroup = new FormGroup({
    id: new FormControl(this.product.id),
  })
      constructor() { }
      
    
      ngOnInit() {
        
      }


      updateData(){
        fetch(`http://localhost:5187/api/Product`, {
          method: 'PUT',
          headers: {
            "Accept": "text/plain",
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.product)
        })
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json(); // Assuming the API returns a response body
        })
        .then(data => {
          console.log('Update successful:', data);
        })
        .catch(err => {
          console.error('Error updating data:', err);
        });
      }

      updateProduct(){
        console.log(this.product)
        this.updateData()
        this.onClose.emit()
      }
      
      updateImagePreview() {
        const imagePreview = document.getElementById('image-preview') as HTMLImageElement;
        if (imagePreview) {
          imagePreview.style.display = this.product.productImageUrl ? 'block' : 'none';
        }
      }
      
      handleClose() {
        this.onClose.emit();
      }

}
