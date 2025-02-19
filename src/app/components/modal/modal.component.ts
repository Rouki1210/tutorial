import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginComponent } from "../../layout/login/login.component";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() titleModal : string = "";

  @Input() open : boolean = false;
  
  @Output() onClose = new EventEmitter();
  @Output() onOk = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  handleClose() {
    console.log("1.close modal")
    this.onClose.emit();
  }

  handleOk() {
    this.onOk.emit();
  }

}
