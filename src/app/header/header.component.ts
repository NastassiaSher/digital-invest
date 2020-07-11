import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from '../services/authorization.service';
import {MatDialog} from '@angular/material/dialog';
import {SignInDialogComponent} from '../sign-in-dialog/sign-in-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuOpen = false;
  menuBtn: HTMLElement;
  menuOptions: HTMLElement;
  userAuthorized: boolean;

  constructor(private authService: AuthorizationService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userAuthorized = !!this.authService.getUser();
    console.log(this.userAuthorized);
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
    if (this.menuOpen) {
      this.openCloseMenu();
    }
    const dialogRef = this.dialog.open(SignInDialogComponent,  {panelClass: 'app-dialog', data: 'sign up'});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
