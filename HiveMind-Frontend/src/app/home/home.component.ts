import { Component, inject, Output } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { PublishComponent } from '../publish/publish.component';
import { IdeaCardComponent } from "../idea-card/idea-card.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, NavbarComponent, PublishComponent, IdeaCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  logo = "assets/HiveMindLogo.png";

  constructor(private router: Router){}
  
  navigateToHome(){
    this.router.navigate(['/login']);
  }

  
}
