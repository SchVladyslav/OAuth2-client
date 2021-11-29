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
  styleUrls: ['./project-signup.component.scss'],
})
export class ProjectSignUpComponent
  extends AbstractPageDirective
  implements OnInit
{
  form: FormGroup;
  projectData: any;

  constructor(
    private projectService: ProjectService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      url: new FormControl('', [Validators.required]),
    });
    this.getProjects();
  }

  onSubmit(): void {
    this.spinner.show();
    this.projectService
      .projectSignUp(this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.projectData = data;
          console.log(data);
          this.notificationService.show(
            `${this.form.value.name} added successfuly`,
            'success'
          );
          this.spinner.hide();
        },
        error: (error) => {
          this.spinner.hide();
          this.notificationService.show(error.error.message, 'error');
        }
      });
  }

  getProjects(): void {
    this.projectService
      .getProjects()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.projectData = data;
        },
        error: (error) => {
          this.notificationService.show(error.error.message, 'error');
        }
      });
  }

  get isProjectsExist(): boolean {
    return this.projectData;
  }
}
