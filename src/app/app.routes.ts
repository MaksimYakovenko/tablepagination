import { Routes } from '@angular/router';
import {TablepaginationComponent} from "./tablepagination/tablepagination.component";
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {VerifyEmailComponent} from "./components/verify-email/verify-email.component";

export const routes: Routes = [
  {component: TablepaginationComponent, path: ''},
  {component: RegisterComponent, path: 'register'},
  {component: LoginComponent, path: 'login'},
  {component: ForgotPasswordComponent, path: 'forgot-password'},
  {component: VerifyEmailComponent, path: 'verify-email'},
]
