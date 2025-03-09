import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [],
  templateUrl: './comment-section.component.html',
})
export class CommentSectionComponent {
  @Input() username!: string;
  @Input() text!: string;

  constructor() {}
}
