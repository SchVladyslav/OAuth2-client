import { Component } from '@angular/core';
import { Notification } from 'src/app/interfaces/notification.interface';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss']
})
export class NotificationModalComponent {

  active: boolean = false;
  data: Notification;

  constructor( private notificationService: NotificationService) {
    this.notificationService.getNotification()
      .subscribe(data => {
       this.data = data;
       this.active = true;
        setTimeout(() => {
          this.closeModal();
        }, 3500)
      });
   }

  closeModal() {
    this.active = false;
  }
}
