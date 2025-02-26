import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.scss'
})
export class CommentSectionComponent {
  @Input() username!: string;
  @Input() text!: string;

  constructor() { }
}
