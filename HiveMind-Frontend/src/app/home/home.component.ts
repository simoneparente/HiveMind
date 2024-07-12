import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
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
