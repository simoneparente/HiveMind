import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { PaginatorComponent } from '../paginator/paginator.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, NavbarComponent, CommonModule, PaginatorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private router: Router) {}
}
