import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgbModule, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'angular-app';
  constructor(private readonly modalService: NgbModal) {}

  public open(modal: any): void {
    this.modalService.open(modal);
  }
}
