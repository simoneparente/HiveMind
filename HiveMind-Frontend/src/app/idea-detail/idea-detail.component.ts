import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IdeaCardComponent } from '../idea-card/idea-card.component';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { ToastrService } from 'ngx-toastr';
import { IdeaType } from '../_services/rest-backend/idea.type';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-idea-detail',
  standalone: true,
  imports: [IdeaCardComponent, NavbarComponent, CommonModule],
  templateUrl: './idea-detail.component.html',
  styleUrl: './idea-detail.component.scss',
})
export class IdeaDetailComponent implements OnInit {
  ideaId!: number;
  idea: IdeaType | null = null;
  restBackendService = inject(RestBackendService);
  toastr = inject(ToastrService);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.ideaId = +this.route.snapshot.paramMap.get('id')!;
    this.loadIdea();
  }

  loadIdea() {
    this.restBackendService.getIdeaInfo(this.ideaId).subscribe({
      next: (response) => {
        this.idea = response;
      },
      error: (err) => {
        this.toastr.error('Error fetching idea: ', err);
      },
    });
  }
}
