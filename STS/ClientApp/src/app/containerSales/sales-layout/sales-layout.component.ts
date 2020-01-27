import { Component, OnInit } from '@angular/core';
import { SalesnavItems } from '../../_Salesnav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-layout',
  templateUrl: './sales-layout.component.html'
})
// export class SalesLayoutComponent implements OnInit {



//   ngOnInit() {
//   }

// }

export class SalesLayoutComponent {
  public sidebarMinimized = false;
  public SalesnavItems = SalesnavItems;

  constructor(private router: Router) { }
  
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}