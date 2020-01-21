import { Component, OnInit } from '@angular/core';
import { SalesnavItems } from '../../_Salesnav';


@Component({
  selector: 'app-sales-layout',
  templateUrl: './sales-layout.component.html'
})
// export class SalesLayoutComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

export class SalesLayoutComponent {
  public sidebarMinimized = false;
  public SalesnavItems = SalesnavItems;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}