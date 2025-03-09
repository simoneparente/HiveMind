import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommentType } from '../_services/rest-backend/idea.type';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';

@Component({
  selector: 'app-comment-box',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './comment-box.component.html',
})
export class CommentBoxComponent {
  @Input() ideaId!: number;
  @Output() commentAdded = new EventEmitter<string>();
  @Output() commentError = new EventEmitter<string>();
  restBackendService = inject(RestBackendService);

  commentForm = new FormGroup({
    comment: new FormControl('', Validators.required),
  });

  submitComment() {
    if (this.commentForm.valid) {
      const username: string = localStorage.getItem('username')!;
      const request: CommentType = {
        text: this.commentForm.value.comment!,
        ideaID: this.ideaId,
        User: {
          username: username,
        },
      };
      this.restBackendService.publishComment(request).subscribe({
        next: (response) => {
          this.commentAdded.emit(this.commentForm.value.comment!);
          this.commentForm.reset();
        },
        error: (err) => {
          console.error('Error publishing comment:', err);
          this.commentError.emit(err);
        },
      });
    }
  }
}
