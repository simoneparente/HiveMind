import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdeaType } from '../_services/rest-backend/idea.type';
import { IdeaCardComponent } from '../idea-card/idea-card.component';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [IdeaCardComponent, CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  @Input() itemsPerPage = 12; //Non 10 perché 12 è divisibile per 2, 3 e 4
  sortBy = 'controversial';
  currentPage = 1;
  totalPages = 0;

  items: IdeaType[] = [];
  paginatedItems: IdeaType[] = [];
  isLoading = true;

  constructor(
    private restBackendService: RestBackendService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const sortParam = params.get('sortBy');
      if (sortParam) {
        this.sortBy = sortParam;
      }
      this.currentPage = 1; // Reset to first page when sortBy changes
      this.loadIdeas();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sortBy'] && !changes['sortBy'].isFirstChange()) {
      this.currentPage = 1; // Reset to first page when sortBy changes
      this.loadIdeas();
    }
  }

  loadIdeas() {
    this.isLoading = true;
    this.restBackendService.getIdeas(this.sortBy).subscribe({
      next: (response) => {
        this.items = response;
        this.totalPages = Math.ceil(response.length / this.itemsPerPage);
        this.paginateIdeas();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching ideas:', err);
        this.isLoading = false;
      },
    });
  }

  paginateIdeas() {
    const start = (this.currentPage - 1) * this.itemsPerPage; //
    const end = this.currentPage * this.itemsPerPage;
    this.paginatedItems = this.items.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadIdeas();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadIdeas();
    }
  }
}
