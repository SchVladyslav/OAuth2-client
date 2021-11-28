import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LogInComponent } from './components/login/login.component';
import { ProjectSignUpComponent } from './components/project-signup/project-signup.component';
import { SignUpComponent } from './components/signup/signup.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout/auth-layout.component';

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LogInComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'project', component: ProjectSignUpComponent }
    ],
  },

  // { path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
  //   { path: 'project', component: CurrencyLayoutComponent },
  // ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
