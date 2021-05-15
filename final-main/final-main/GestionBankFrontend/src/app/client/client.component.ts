import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { navItems } from '../_navClient';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

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

  ngOnInit(): void {
  }

}
