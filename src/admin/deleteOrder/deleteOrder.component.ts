import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ModalComponent } from '../../app/components/modal/modal.component';

@Component({
  selector: 'app-deleteOrder',
  templateUrl: './deleteOrder.component.html',
  imports: [CommonModule, ModalComponent],
  styleUrls: ['./deleteOrder.component.css']
})
export class DeleteOrderComponent implements OnInit {

  @Output() onClose = new EventEmitter();
  @Input() order : any[] = []
  constructor() { }

  ngOnInit() {
  }

  deleteOrder(order : any){
    console.log(order);
    this.onClose.emit();
  }
  
  handleClose() {
    this.onClose.emit();
  }
}
