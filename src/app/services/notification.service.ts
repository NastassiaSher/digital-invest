import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notification: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() { }

  setNotification(value: string): void {
    this.notification.next(value);
  }
}
