import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number = 1
  @Input() total: number = 0
  @Input() limit: number = 8
  @Output() changePage = new EventEmitter<number>()
  
  pages: number[] = []
  constructor() { }

  ngOnInit() {
    const pagesCount = Math.ceil(this.total/this.limit)
    this.pages = this.range(1, pagesCount)
  }

  range(start: number, end: number): number[]{
    return [...Array(end).keys()].map((el) => el + start)
  }

  changeNumPage(page: number){
      this.currentPage = page ;
      this.changePage.emit(this.currentPage);
  }
}
