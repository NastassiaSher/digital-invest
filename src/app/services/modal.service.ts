import { Injectable } from '@angular/core';
import {SignInDialogComponent} from '../sign-in-dialog/sign-in-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  dialogRef;

  constructor(public dialog: MatDialog) { }

  openSignInModal(): void {
    this.dialogRef = this.dialog.open(SignInDialogComponent,  {panelClass: 'app-dialog', data: 'sign in'});
  }
  openSignUpModal(): void {
    this.dialogRef = this.dialog.open(SignInDialogComponent,  {panelClass: 'app-dialog', data: 'sign up'});
  }

}
