import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { PublishComponent } from './publish/publish.component';
import { IdeaCardComponent } from './idea-card/idea-card.component';
import { IdeaPageComponent } from './idea-page/idea-page.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
    title: 'Redirect...',
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
    path: 'home',
    title: 'Home',
    component: HomeComponent,
  },
  {
    path: 'publish',
    title: 'Publish',
    component: PublishComponent,
  },
  {
    path: 'ideaCard',
    title: 'Idea Card',
    component: IdeaCardComponent,
  },
  {
    path: 'ideaPage',
    title: 'Idea Page',
    component: IdeaPageComponent,
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
