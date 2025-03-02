import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalComponent } from '../../components/modal/modal.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ModalComponent, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() onClose = new EventEmitter();

  constructor() { }
  

  ngOnInit() {
  }

  loginObj: any = {
    "UserName": "",
    "Password": "",
  }
  
  handleClose() {
    console.log("2. handle close in login component")
    this.onClose.emit();
  }

  loginOK(){
    console.log(this.loginObj)
  }
}
