import { Component, inject, signal, Input } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { CommentBoxComponent } from '../comment-box/comment-box.component';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { ToastrService } from 'ngx-toastr';
import {
  ResponseType,
  VoteRequest,
  CommentType,
} from '../_services/rest-backend/idea.type';
import { RouterLink } from '@angular/router';
import { CommentSectionComponent } from '../comment-section/comment-section.component';

@Component({
  selector: 'app-idea-card',
  standalone: true,
  imports: [
    MarkdownModule,
    RouterLink,
    CommentBoxComponent,
    CommentSectionComponent,
  ],
  templateUrl: './idea-card.component.html',
  styleUrl: './idea-card.component.scss',
})
export class IdeaCardComponent {
  restBackendService = inject(RestBackendService);
  toastr = inject(ToastrService);
  @Input() ideaId!: number;
  idea = {
    title: '',
    description: '',
    username: '',
    date: '',
    comments: [] as CommentType[],
  };
  votes = {
    upvotes: 0,
    downvotes: 0,
  };
  showCommentBox = signal(false);
  detailPath = ``;

  ngOnInit() {
    this.loadIdea();
  }

  loadIdea() {
    this.restBackendService.getIdeaInfo(this.ideaId).subscribe({
      next: (response) => {
        this.detailPath = `/idea/${response.id}`;
        this.idea.title = response.title;
        this.idea.description = response.description;
        this.idea.username = response.User.username;
        this.idea.comments = response.Comments;
        this.votes.upvotes = response.upvotes;
        this.votes.downvotes = response.downvotes;
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

  upvote(event: Event) {
    event.stopPropagation();
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
      error: (err) => {
        if(err.error.error.includes('own')) {
          this.toastr.error('You cannot upvote your own idea', 'Error');
        } else{
          this.toastr.error('An error occurred while upvoting', 'Unknown Error');
        }
      },
    });
  }

  downvote(event: Event) {
    event.stopPropagation();
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
        if(err.error.error.includes('own')) {
          this.toastr.error('You cannot downvote your own idea', 'Error');
        } else{
          this.toastr.error('An error occurred while upvoting', 'Unknown Error');
        }
      },
    });
  }

  updateVotes() {
    this.restBackendService.getIdeaInfo(this.ideaId).subscribe({
      next: (response) => {
        this.votes.upvotes = response.upvotes;
        this.votes.downvotes = response.downvotes;
      },
      error: (err) => {
        this.toastr.error('Error updating votes: ');
        console.log('Error: ' + err.message);
      },
    });
  }

  addComment(comment: string) {
    this.idea.comments.push({
      text: comment,
      ideaID: this.ideaId,
      User: {
        username: localStorage.getItem('username') ?? '',
      },
    });
  }

  toggleCommentBox() {
    this.showCommentBox.update((value) => !value);
  }
}
