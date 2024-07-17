import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component'
import { RegisterComponent } from '../register/register.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: "",
        pathMatch: 'full',
        redirectTo: "/home",
        title: "Redirect...",
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
    /*{
        path: "unpopular",
        title: "Unpopular",
        //component: UnpopularIdeasComponent
    },
    {
        path: "mainstream",
        title: "Mainstream",
        //component: MainstreamIdeasComponent
    }*/
];