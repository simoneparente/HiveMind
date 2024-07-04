import { Component } from '@angular/core';
//import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-generic-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {


  onClick(){
    alert("prova");
  }
}
