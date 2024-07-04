import { Routes } from '@angular/router';
import { ButtonComponent } from '../components/button/button.component'
import {HomepageComponent} from './homepage/homepage.component'

export const routes: Routes = [
    {
        path: "",
        title: "Home",
        component: HomepageComponent,
    },
    {
        path: "button",
        title: "Button",
        component: ButtonComponent
    }
];
