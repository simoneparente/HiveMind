import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  logo = 'assets/HiveMindLogo.png';
  publishPath = '/publish';
  homePath = '/home';
  logoutPath = '/logout';
  unpopularPath = '/unpopular';
  mainstreamPath = '/mainstream';
  constructor() {}
}
