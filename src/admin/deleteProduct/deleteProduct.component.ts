import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ModalComponent } from '../../app/components/modal/modal.component';

@Component({
  selector: 'app-deleteProduct',
  templateUrl: './deleteProduct.component.html',
  imports: [CommonModule, ModalComponent],
  styleUrls: ['./deleteProduct.component.css']
})
export class DeleteProductComponent implements OnInit {

  @Output() onClose = new EventEmitter();
  @Input() product : any = [];
  
    constructor() { }
    
  
    ngOnInit() {
    }

    fetchData(product : any){
      fetch(`http://localhost:5187/api/Product/${product}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json(); // Assuming the API returns a response body
      })
      .then(data => {
        console.log('Delete successful:', data);
      })
      .catch(err => {
        console.error('Error deleting data:', err);
      });
    }

    deleteProduct(product : any){
      console.log(product);
      this.fetchData(product);
      this.onClose.emit();
    }
    
    handleClose() {
      this.onClose.emit();
    }

}
