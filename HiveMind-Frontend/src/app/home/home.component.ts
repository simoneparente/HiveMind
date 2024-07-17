import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { NewIdeaBoxComponent } from '../ideas-component/new-idea-box/new-idea-box.component';
import { IdeaBoxComponent } from '../ideas-component/idea-box/idea-box.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, NavbarComponent, NewIdeaBoxComponent, IdeaBoxComponent],
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
