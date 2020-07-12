import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AuthorizationService} from '../services/authorization.service';
import {ModalService} from '../services/modal.service';

@Component({
  selector: 'app-sign-up-dialog',
  templateUrl: './sign-in-dialog.component.html',
  styleUrls: ['./sign-in-dialog.component.scss']
})
export class SignInDialogComponent implements OnInit {

  signUpForm;
  btnLabel: string;
  isSubmitted = false;
  showLoginError = false;

  constructor(private authService: AuthorizationService,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public dialogType: string,
              public dialogRef: MatDialogRef<SignInDialogComponent>,
              private modalService: ModalService) {
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(8)]],
      passConf: ['', [Validators.required, Validators.required]],
      conditions: [false, Validators.requiredTrue]
    }, { validators: this.confirmPasswordValidator });
  }

  ngOnInit(): void {
    this.btnLabel = this.dialogType === 'sign up' ? 'join now' : 'let\'s invest';
  }

  get formControls() { return this.signUpForm.controls; }

  get formErrors() { return this.signUpForm.errors; }

  get dialogTypeGetter() { return this.dialogType; }

  onSubmit(customerData): void {
    // Process checkout data here
    this.isSubmitted = true;
    this.showLoginError = false;
    switch (this.dialogType) {
      case 'sign up': {
        if (this.signUpForm.status === 'VALID') {
          this.authService.registerNewUser({
            email: customerData.email,
            pass: customerData.pass,
            name: customerData.name
          });
          this.signUpForm.reset();
          this.dialogRef.close();
        }
        break;
      }
      case 'sign in': {
        const success = this.authService.loginUser({
          email: customerData.email,
          pass: customerData.pass
        });
        if (success) {
          this.signUpForm.reset();
          this.dialogRef.close();
        } else {
          this.showLoginError = true;
        }
        break;
      }
    }
    if (this.authService.getUser()) {
      this.modalService.openInfoModal({
        title: 'Sign in',
        message: 'You are signed in!'
      });
    }
  }

  confirmPasswordValidator(control: FormGroup): ValidationErrors {
    const pass = control.get('pass');
    const passConf = control.get('passConf');
    return pass.value === passConf.value ? null : { confirmed: false } ;
  }

  showSignUpDialogContent(): void {
    this.dialogType = 'sign up';
  }

  showSignInDialogContent(): void {
    this.dialogType = 'sign in';
  }

}
