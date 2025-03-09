import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink, FooterComponent],
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent {
  registerPath = '/register';
  loginPath = '/login';

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
