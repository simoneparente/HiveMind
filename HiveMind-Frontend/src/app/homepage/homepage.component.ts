import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  onSubmit() {
    // Logica per gestire il submit del form
    console.log('Form submitted');
  }
}
