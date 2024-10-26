import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Menu } from '../dashboard/menu.model';
import { MatListItem, MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [
    NgIf, NgFor,
    MatListModule,
    MatListItem,
    MatIcon,
    RouterModule
  ],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {

  @Input() public menu: Menu = [];
}
