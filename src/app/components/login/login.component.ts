import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { OAuthService } from 'src/app/services/oauth/oauth.service';
import { AbstractPageDirective } from 'src/app/shared/abstract-page/abstract-page.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LogInComponent extends AbstractPageDirective implements OnInit {
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private notificationService: NotificationService,
    private oAuthService: OAuthService
  ) {
    super();
  }
  
  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    // this.route.queryParams
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((params: Params) => {
    //     if (params['registered']) {
    //       this.notificationService.show('You can login now.');
    //     } else if (params['accessDenied']) {
    //       this.notificationService.show('Authorization is required!', 'error');
    //     } else if (params['sessionExpired']) {
    //       this.notificationService.show('Please, login again.');
    //     }
    //   });
  }

  onSubmit() {
    this.spinner.show("login");
    this.authService
      .login(this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.router.navigate(['/project']);
        },
        (error) => {
          this.spinner.hide("login");
          this.notificationService.show(error.error.message, 'error');
        }
      );
  }

  logInWithOAuth() {
    this.oAuthService.logInWithOAuth()
  }
}
