import { Component } from '@angular/core';
import { INavLink, NAV_LINKS } from '../../../constants';
import { CommonModule } from '@angular/common';
import { MatToolbar, MatToolbarRow, MatToolbarModule } from "@angular/material/toolbar";

@Component({
  selector: 'app-header-component',
  imports: [CommonModule, MatToolbar, MatToolbarRow, MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  links: INavLink[] = [];

  ngOnInit() {
    this.links = NAV_LINKS;
  }
}
