import { Injectable } from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {UserData} from '../models/user-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private storageService: LocalStorageService) { }

  registerNewUser(newUserData): void {
    const token = btoa(newUserData.email + ':' + newUserData.pass);
    const newUser = new UserData(newUserData.name, {});
    this.storageService.set(token, newUser);
    this.storageService.set('currentUser', token);
  }

  loginUser(loginData): boolean {
    const token = btoa(loginData.email + ':' + loginData.pass);
    if (this.storageService.get(token)) {
      this.storageService.set('currentUser', token);
      return true;
    }
    return false;
  }

  getUser(): string {
    return this.storageService.get('currentUser');
  }

  signOut(): void {
    this.storageService.remove('currentUser');
  }

  decodeUser(token): string {
    return atob(token);
  }
}
