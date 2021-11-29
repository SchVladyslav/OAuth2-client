import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';
import { concatMap, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { OAuthService } from 'src/app/services/oauth/oauth.service';
import { AbstractPageDirective } from 'src/app/shared/abstract-page/abstract-page.directive';
import { Environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LogInComponent extends AbstractPageDirective implements OnInit {
  form: FormGroup;
  isOAuthMode: boolean = false;

  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private notificationService: NotificationService,
    private oAuthService: OAuthService,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) => {
        if (params['client_id'] && params['response_type']) {
          this.isOAuthMode = true;
        }
      });
  }

  onSubmit() {
    this.spinner.show('login');
    this.authService
      .login(this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          if (this.isOAuthMode) {
            this.onOAuthSubmit();
          } else {
            this.router.navigate(['/project']);
          }
          this.spinner.hide('login');
        },
        (error) => {
          this.spinner.hide('login');
          this.notificationService.show(error.error.message, 'error');
        }
      );
  }

  onOAuthSubmit() {
    this.spinner.show('oauthLogin');

    this.oAuthService
      .verifyProject()
      .pipe(
        concatMap((data) => {
          const answer = confirm(
            `Do you confirm access to ${data.scope} scope?`
          );
          if (answer) {
            return this.oAuthService.getCode();
          }
          return of(false);
        }),
        concatMap((data) => this.oAuthService.getToken(data.code)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response) => {
          this.authService.setTokenInLC(response.access_token);
          window.location.href = Environment.redirectURL;
          this.spinner.hide('oauthLogin');
        },
        error: (error) => {
          this.spinner.hide('oauthLogin');
          this.notificationService.show(error.error.message, 'error');
        },
      });
  }

  logInWithOAuth() {
    window.open(
      document.URL + '?client_id=oauth&response_type=code&scope=profile',
      '_blank',
      'location=yes,height=570,width=520,scrollbars=yes,status=yes'
    );
  }
}
