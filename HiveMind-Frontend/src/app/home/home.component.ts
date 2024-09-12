import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { PublishComponent } from '../publish/publish.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, NavbarComponent, PublishComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  logo= "assets/HiveMindLogo.png";
  constructor(private router: Router){}
  
  navigateToHome(){
    this.router.navigate(['/login']);
  }
}
