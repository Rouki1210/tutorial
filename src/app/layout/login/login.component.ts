import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-login',
  imports: [ModalComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() onClose = new EventEmitter();

  constructor() { }
  

  ngOnInit() {
  }

  openSearch(){
    
  }
  
  handleClose() {
    console.log("2. handle close in login component")
    this.onClose.emit();
  }

  loginOK(){
    alert("Login Successful")
  }
}
