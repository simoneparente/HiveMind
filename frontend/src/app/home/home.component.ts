import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { PaginatorComponent } from '../paginator/paginator.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    NavbarComponent,
    CommonModule,
    PaginatorComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private readonly router: Router) {}
}
