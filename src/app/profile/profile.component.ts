import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from '../services/authorization.service';
import {LocalStorageService} from '../services/local-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  flag = 'profile';
  email: string;
  pass: string;
  name: string;
  totalInv = 0;

  constructor(private authService: AuthorizationService, private storageService: LocalStorageService) { }

  ngOnInit(): void {
    // prepare data to show in profile info
    const currUser = this.authService.getUser();
    const userData = this.storageService.get(currUser);
    const emailPass = this.authService.decodeUser(currUser);
    this.email = emailPass.split(':')[0];
    this.pass = emailPass.split(':')[1];
    this.name = userData.name;
    const inv = new Map(Object.entries(userData.investments));
    inv.forEach((item) => {
      this.totalInv = this.totalInv + item;
    });
  }

}
