import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component'
import { RegisterComponent } from '../register/register.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

export const routes: Routes = [
    {
        path: "",
        title: "Prova",
        component: AppComponent,
    },
    {
        path: "login",
        title: "Login",
        component: LoginComponent,
    },
    {
        path: "register",
        title: "Register",
        component: RegisterComponent
    },
    {
        path: "home",
        title: "Home",
        component: HomeComponent
    },
    {
        path: "navbar",
        title: "navbar",
        component: NavbarComponent
    }
];
