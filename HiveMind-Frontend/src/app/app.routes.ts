import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { PublishComponent } from './publish/publish.component';
import { IdeaDetailComponent } from './idea-detail/idea-detail.component';
import { CommentSectionComponent } from './comment-section/comment-section.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
    title: 'Redirect...',
  },
  {
    path: 'home',
    title: 'Home - HiveMind',
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
    component: PublishComponent,
  },
  {
    path: 'idea/:id',
    title: 'Idea Page',
    component: IdeaDetailComponent,
  },
  {
    path: 'logout',
    title: 'Logout',
    redirectTo: '/login',
  },
  {
    path: 'commentsect',
    title: 'Comment Section',
    component: CommentSectionComponent,
  },
];
