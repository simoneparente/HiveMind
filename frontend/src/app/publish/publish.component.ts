import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/auth/auth.service';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-publish',
  standalone: true,
  imports: [ReactiveFormsModule, MarkdownModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './publish.component.html',
  styleUrl: './publish.component.scss',
})
export class PublishComponent {
  toastr = inject(ToastrService);
  authService = inject(AuthService);
  restBackendService = inject(RestBackendService);

  titlePreview = 'Title preview';
  ideaForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.maxLength(400)),
  });
  descriptionPreview = '<i>Description Preview</i>';
  author = localStorage.getItem('username') ?? '';

  today = new Date();
  dd = String(this.today.getDate()).padStart(2, '0');
  mm = String(this.today.getMonth() + 1).padStart(2, '0'); //NB: January is 0!
  yyyy = this.today.getFullYear();

  constructor() {
    this.ideaForm.valueChanges.subscribe((val) => {
      this.updatePreview();
    });
  }

  updatePreview() {
    this.titlePreview = 'Title preview';
    if (this.ideaForm.value.title) {
      this.titlePreview = this.ideaForm.value.title;
    }
    this.descriptionPreview = '<i>Description Preview</i>';
    if (this.ideaForm.value.description) {
      this.descriptionPreview = this.ideaForm.value.description;
    }
  }

  publishIdea() {
    if (!this.ideaForm.valid) {
      this.toastr.error('Description cannot exceed 400 characters!');
      this.toastr.error('An idea must have a title!');
      return;
    }

    const request = {
      title: this.ideaForm.value.title ?? '',
      description: this.ideaForm.value.description ?? '',
      username: localStorage.getItem('username') ?? '',
    };
    this.restBackendService.publishIdea(request).subscribe({
      next: (response) => {
        this.toastr.success('Idea published successfully!');
      },
      error: (err) => {
        this.toastr.error('An error occurred while publishing the idea');
      },
    });
  }
}
