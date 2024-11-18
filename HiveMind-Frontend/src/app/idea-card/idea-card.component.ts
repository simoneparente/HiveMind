import { Component, inject, signal, Input } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { CommentBoxComponent } from '../comment-box/comment-box.component';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-idea-card',
  standalone: true,
  imports: [MarkdownModule, CommentBoxComponent],
  templateUrl: './idea-card.component.html',
  styleUrl: './idea-card.component.scss'
})
export class IdeaCardComponent {
  restBackendService = inject(RestBackendService);
  toastrService = inject(ToastrService);
  @Input() ideaId!: number;
  idea = {
    title: "",
    description: "",
    username: "",
    date: new Date(),
  };
  votes = {
    upvotes: 0,
    downvotes: 0
  }
  showCommentBox = signal(false);


  ngOnInit(){
    console.log(`Loading idea [${this.ideaId}]`);
    this.loadIdea();
    console.log("Loaded");
  }
  toggleCommentBox(){
    this.showCommentBox.update(value => !value);
  }

  loadIdea() {
    this.restBackendService.getIdeaInfo(this.ideaId).subscribe({
      next: (response) => {
        console.log(response)
        this.idea = response.idea;
        this.idea.username = response.idea.User.username;
        this.votes.upvotes = response.upvotes;
        this.votes.downvotes = response.downvotes;
      },
      error: (err) => {
        this.toastrService.error('Error fetching idea: ', err);
        console.log("Error: " + err.message);
      }
    });
  }

}
