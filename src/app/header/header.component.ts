import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from '../services/authorization.service';
import {ModalService} from '../services/modal.service';
import {NotificationService} from '../services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuOpen = false;
  menuBtn: HTMLElement;
  menuOptions: HTMLElement;

  constructor(private authService: AuthorizationService,
              private modalService: ModalService,
              private notifService: NotificationService) { }

  ngOnInit(): void {}

  get userAuthorized(): boolean {
    return !!this.authService.getUser();
  }

  openCloseMenu(): void {
    this.menuBtn = document.querySelector('.menu-btn');
    this.menuOptions = document.querySelector('.menu-options');
    if (!this.menuOpen) {
      this.menuBtn.classList.add('open');
      this.menuOptions.classList.add('menu-opened');
      this.menuOpen = true;
    } else {
      this.menuBtn.classList.remove('open');
      this.menuOptions.classList.remove('menu-opened');
      this.menuOpen = false;
    }
  }

  openSignInModal(): void {
    this.openCloseMenu();
    this.modalService.openSignInModal();
  }

  openSignUpModal(): void {
    this.openCloseMenu();
    this.modalService.openSignUpModal();
  }

  signOut(): void {
    this.openCloseMenu();
    this.authService.signOut();
    this.notifService.setNotification('You are signed out!');
  }

}
