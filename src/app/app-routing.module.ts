import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LogInComponent } from './components/login/login.component';
import { SignUpComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: 'login', component: LogInComponent },
  { path: 'signup', component: SignUpComponent },
  // { path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
  //   { path: 'project', component: CurrencyLayoutComponent },
  // ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
