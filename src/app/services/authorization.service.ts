import { Injectable } from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {UserData} from '../models/user-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private storageService: LocalStorageService) { }

  registerNewUser(newUserData): void {
    const token = btoa(newUserData.email + '' + newUserData.pass);
    const newUser = new UserData(newUserData.name, new Map());
    this.storageService.set(token, newUser);
    this.storageService.set('currentUser', token);
  }

  loginUser(loginData): void {
    const token = btoa(loginData.email + '' + loginData.pass);
    if (this.storageService.get(token)) {
      this.storageService.set('currentUser', token);
    } else {
      // TODO show error: no such user!
    }
  }

  getUser(): string {
    return this.storageService.get('currentUser');
  }
}
