import { Component } from '@angular/core';
import { INavLink, NAV_LINKS } from '../../../constants';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-header-component',
  imports: [CommonModule, SharedModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  links: INavLink[] = [];

  ngOnInit() {
    this.links = NAV_LINKS;
  }
}
