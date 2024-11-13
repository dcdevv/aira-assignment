import { Component } from '@angular/core';
import { Menu } from './menu.model';
import { RouterOutlet } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HeaderComponent } from '../header/header.component';
import { MenuItemComponent } from '../menu-item/menu-item.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    HeaderComponent,
    MenuItemComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public opened = true;

  public menu: Menu = [
    {
      title: 'Table',
      icon: 'grid',
      link: '/feature-table',
      color: '#ff7f0e',
    },
    {
      title: 'Tree View',
      icon: 'home',
      link: '/tree-structure',
      color: '#ff7f0e',
    },
    {
      title: 'Dropdowns',
      icon: 'home',
      link: '/dropdowns',
      color: '#ff7f0e',
    }
  ];
  
  public toggle(): void {
    this.opened = !this.opened;
  }
}
