import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:5187/api'

  posts: any

  constructor(private http: HttpClient) { }

  getProducts() {
    this.posts = this.http.get(this.baseUrl + 'orders')
  }
}
