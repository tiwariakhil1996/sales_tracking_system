import { Component, OnInit } from '@angular/core';
import { navItems } from '../../sales/_nav';

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
  public navItems = navItems;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}