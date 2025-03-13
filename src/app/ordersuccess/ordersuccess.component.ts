import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordersuccess',
  templateUrl: './ordersuccess.component.html',
  styleUrls: ['./ordersuccess.component.css']
})
export class OrdersuccessComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  backToHome(){
    this.router.navigate(['/']);
  }

}
