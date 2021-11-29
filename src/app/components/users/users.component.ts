import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user.interface';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/user/user.service';
import { AbstractPageDirective } from 'src/app/shared/abstract-page/abstract-page.directive';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent extends AbstractPageDirective implements OnInit {
  private users: User[];

  constructor(
    private userService: UserService,
    private notificationService: NotificationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.userService
      .fetchUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (users) => {
          this.users = users;
        },
        error: (error) => {
          this.notificationService.show(error.error.message, 'error');
        },
      });
  }

  get usersList(): User[] {
    return this.users;
  }
}
