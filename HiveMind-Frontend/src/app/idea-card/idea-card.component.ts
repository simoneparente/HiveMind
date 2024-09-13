import { Component, signal } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { CommentBoxComponent } from '../comment-box/comment-box.component';

@Component({
  selector: 'app-idea-card',
  standalone: true,
  imports: [MarkdownModule, CommentBoxComponent],
  templateUrl: './idea-card.component.html',
  styleUrl: './idea-card.component.scss'
})
export class IdeaCardComponent {
  title = "Sample Title";
  description = "This is a sample description!";
  author = "sample";
  date = {
    dd: String(1).padStart(2, '0'),
    mm: String(1).padStart(2, '0'),
    yyyy: 1970
  }
  nLikes = 22;
  nDislikes = 3;
  showCommentBox = signal(false);

  toggleCommentBox(){
    this.showCommentBox.update(value => !value);
  }
}
