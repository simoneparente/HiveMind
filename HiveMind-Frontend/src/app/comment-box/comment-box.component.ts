import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommentType } from '../_services/rest-backend/idea.type';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';

@Component({
  selector: 'app-comment-box',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './comment-box.component.html',
  styleUrl: './comment-box.component.scss',
})
export class CommentBoxComponent {
  @Input() ideaId!: number;
  @Output() commentAdded = new EventEmitter<string>();
  restBackendService = inject(RestBackendService);

  commentForm = new FormGroup({
    comment: new FormControl('', Validators.required),
  });

  submitComment() {
    if (this.commentForm.valid) {
      this.commentAdded.emit(this.commentForm.value.comment!);
      const username: string = localStorage.getItem('username')!;
      const request: CommentType = {
        text: this.commentForm.value.comment!,
        ideaID: this.ideaId,
        username: username
      };
      this.restBackendService.publishComment(request).subscribe({
        next: (response) => {
          console.log(`[INFO] Comment published: ${response.message}`);
        }
      })
    }
  }
}
