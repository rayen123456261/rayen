import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'default-layout.component.html',
  styleUrls: ['default-layout.component.css']
})
export class DefaultLayoutComponent {
  
  public sidebarMinimized = false;
  public navItems = navItems;
  constructor(private route: Router) {}
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    window.location.href = "http://localhost:4200/login";
}


}
