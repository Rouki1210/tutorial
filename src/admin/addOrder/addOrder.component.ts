import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ModalComponent } from '../../app/components/modal/modal.component';

@Component({
  selector: 'app-addOrder',
  templateUrl: './addOrder.component.html',
  imports: [CommonModule, ModalComponent],
  styleUrls: ['./addOrder.component.css']
})
export class AddOrderComponent implements OnInit {

  @Output() onClose = new EventEmitter();
  @Input() orders = []
  constructor() { }

  ngOnInit() {
  }

  handleClose() {
    this.onClose.emit();
  }
}
