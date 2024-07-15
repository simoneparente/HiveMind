import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  logo= "assets/HiveMindLogo.png";


  constructor(private router: Router){}
  
  navigateToHome(){
    this.router.navigate(['/login']);

  }
}