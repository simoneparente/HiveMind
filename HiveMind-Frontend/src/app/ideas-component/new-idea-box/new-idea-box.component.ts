import { Component, OnInit } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-idea-box',
  standalone: true,
  imports: [MarkdownComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './new-idea-box.component.html',
  styleUrls: ['./new-idea-box.component.scss']
})
export class NewIdeaBoxComponent {
  ideaForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required, Validators.maxLength(400)])
  });



  onSubmit() {
    if (this.ideaForm.valid) {
      console.log('Form Submitted', this.ideaForm.value);
      // Implement your submission logic here
    } else {
      console.error('Form is invalid');
    }
  }
}
