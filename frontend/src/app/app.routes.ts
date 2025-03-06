import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { PublishComponent } from './publish/publish.component';
import { IdeaDetailComponent } from './idea-detail/idea-detail.component';
import { AuthGuard } from './_guards/auth-guard.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/welcome',
    title: 'Redirect...',
  },
  {
    path: 'welcome',
    title: 'Welcome to HiveMind',
    component: LandingPageComponent
  },
  {
    path: 'home',
    title: 'Home - HiveMind',
    canActivate: [AuthGuard],
    component: HomeComponent,
  },
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent,
  },
  {
    path: 'register',
    title: 'Register',
    component: RegisterComponent,
  },
  {
    path: 'publish',
    title: 'Publish',
    canActivate: [AuthGuard],
    component: PublishComponent,
  },
  {
    path: 'idea/:id',
    title: 'Idea Page',
    canActivate: [AuthGuard],
    component: IdeaDetailComponent,
  },
  {
    path: 'logout',
    title: 'Logout',
    redirectTo: '/login',
  },
];
