import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  logo = "assets/HiveMindLogo.png";
  loginPath = "/login";
  unpopularPath = "/unpopular";
  mainstreamPath = "/mainstream";
  constructor(private router: Router){}
}