import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { takeUntil } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { AbstractPageDirective } from 'src/app/shared/abstract-page/abstract-page.directive';

@Component({
  selector: 'app-project-signup',
  templateUrl: './project-signup.component.html',
  styleUrls: ['./project-signup.component.scss']
})
export class ProjectSignUpComponent extends AbstractPageDirective implements OnInit {
  form: FormGroup;

  constructor(
    private projectService: ProjectService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private notificationService: NotificationService, 
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    this.spinner.show();
    this.projectService
      .projectSignUp(this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.spinner.hide();
          this.notificationService.show(error.error.message, 'error');
        }
      );
  }
}
