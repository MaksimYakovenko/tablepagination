import { Routes } from '@angular/router';
import {TablepaginationComponent} from "./tablepagination/tablepagination.component";
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";

export const routes: Routes = [
  {component: TablepaginationComponent, path: ''},
  {component: RegisterComponent, path: 'register'},
  // {component: LoginComponent, path: 'login'}
]
