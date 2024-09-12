import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-publish',
  standalone: true,
  imports: [ReactiveFormsModule, MarkdownModule],
  templateUrl: './publish.component.html',
  styleUrl: './publish.component.scss'
})
export class PublishComponent {
  titlePreview = 'Title preview';
  ideaForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('')
  })
  descriptionPreview = "<i>Description Preview</i>";
  author = localStorage.getItem("username");
  today = new Date();
  dd = String(this.today.getDate()).padStart(2, '0');
  mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
  yyyy = this.today.getFullYear();

  constructor(){
    this.ideaForm.valueChanges.subscribe(val => {
      this.updatePreview();
    });
  }

  updatePreview() {
    this.titlePreview = this.ideaForm.value.title || "Title preview";
    this.descriptionPreview = this.ideaForm.value.description || "<i>Description Preview</i>";
  }
}
