import {Component, OnInit} from '@angular/core';
import {NotificationService} from './services/notification.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'digital-invest';
  notificationMessage: BehaviorSubject<string> = new BehaviorSubject('');
  showNotification = false;

  constructor(private notifService: NotificationService) {}

  ngOnInit(): void {
    this.notifService.notification.subscribe((message) => {
      if (message !== '') {
        this.notificationMessage.next(message);
        this.showNotification = true;
        setTimeout(() => {
          this.showNotification = false;
        }, 5000);
      }
    });
  }



}
