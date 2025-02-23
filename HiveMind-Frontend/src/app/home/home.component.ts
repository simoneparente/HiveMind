import { Component, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { PublishComponent } from '../publish/publish.component';
import { IdeaCardComponent } from '../idea-card/idea-card.component';
import { IdeaType } from '../_services/rest-backend/idea.type';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    NavbarComponent,
    CommonModule,
    PublishComponent,
    IdeaCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  ideas: IdeaType[] = [];
  currentPage = 1;
  pageSize = 10;
  isLoading = true;

  buttonsClassList = 'btn btn-outline-primary btn-sm';

  constructor(
    private router: Router,
    private restBackendService: RestBackendService,
  ) {}

  navigateToHome() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.loadIdeas();
  }

  loadIdeas() {
    this.restBackendService
      .getIdeas(this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          this.ideas = response;
          this.isLoading = false;
          for (let idea of this.ideas) {
            console.log(idea.id);
          }
        },
        error: (err) => {
          console.error('Error fetching ideas:', err);
          this.isLoading = false;
        },
      });
  }

  nextPage() {
    this.currentPage++;
    this.loadIdeas();
    this.reloadButtons();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadIdeas();
      this.reloadButtons();
    }
  }

  reloadButtons() {
    let prevButton = document.getElementById('previousPage');
    let nextButton = document.getElementById('nextPage');
    if (nextButton === null || prevButton === null) {
      return;
    }
    if (this.currentPage === 1) {
      prevButton.classList.add('disabled');
    } else {
      prevButton.classList.remove('disabled');
    }
  }

  ngAfterViewInit() {
    this.reloadButtons();
  }
}
