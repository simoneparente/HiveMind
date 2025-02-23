import { Component, inject, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { CommentBoxComponent } from '../comment-box/comment-box.component';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { ToastrService } from 'ngx-toastr';
import { ResponseType, VoteRequest } from '../_services/rest-backend/idea.type';
@Component({
  selector: 'app-idea-page',
  standalone: true,
  imports: [MarkdownModule, CommentBoxComponent, CommonModule],
  templateUrl: './idea-page.component.html',
  styleUrl: './idea-page.component.scss',
})
export class IdeaPageComponent {
  restBackendService = inject(RestBackendService);
  toastr = inject(ToastrService);
  @Input() ideaId!: number;
  idea = {
    title: '',
    description: '',
    username: '',
    date: '',
    upvotes: 0,
    downvotes: 0,
  };
  showCommentBox = signal(false);

  ngOnInit() {
    console.log(`Loading idea [${this.ideaId}]`);
    this.loadIdea();
    console.log('Loaded');
  }

  loadIdea() {
    this.restBackendService.getIdeaInfo(this.ideaId).subscribe({
      next: (response) => {
        console.log(response);
        this.idea.title = response.title;
        this.idea.description = response.description;
        this.idea.username = response.User.username;
        console.log(response.upvotes);
        this.idea.upvotes = response.upvotes;
        this.idea.downvotes = response.downvotes;
        this.idea.date = this.convertDate(response.dateTime);
      },
      error: (err) => {
        this.toastr.error('Error fetching idea: ', err);
        console.log('Error: ' + err.message);
      },
    });
  }

  convertDate(date: string | Date) {
    if (typeof date === 'string') {
      return new Date(date).toLocaleDateString();
    } else {
      return date.toLocaleDateString();
    }
  }

  upvote() {
    const request: VoteRequest = {
      ideaID: this.ideaId,
      username: localStorage.getItem('username') ?? '',
      vote: '+1',
    };
    this.restBackendService.upvoteIdea(request).subscribe({
      next: () => {
        this.toastr.success('Upvoted!');
        this.updateVotes();
      },
      error: (err: ResponseType) => {
        this.toastr.error('An error occurred while upvoting');
        console.log('Error: ' + err.message);
      },
    });
  }

  downvote() {
    const request: VoteRequest = {
      ideaID: this.ideaId,
      username: localStorage.getItem('username') ?? '',
      vote: '-1',
    };
    this.restBackendService.downvoteIdea(request).subscribe({
      next: () => {
        this.toastr.success('Downvoted!');
        this.updateVotes();
      },
      error: (err) => {
        this.toastr.error('An error occurred while downvoting');
        console.log('Error: ' + err.message);
      },
    });
  }

  updateVotes() {
    this.restBackendService.getIdeaInfo(this.ideaId).subscribe({
      next: (response) => {
        this.idea.upvotes = response.upvotes;
        this.idea.downvotes = response.downvotes;
      },
      error: (err) => {
        this.toastr.error('Error updating votes: ', err);
        console.log('Error: ' + err.message);
      },
    });
  }

  toggleCommentBox() {
    this.showCommentBox.update((value) => !value);
  }
}
