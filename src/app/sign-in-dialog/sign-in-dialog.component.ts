import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-sign-up-dialog',
  templateUrl: './sign-in-dialog.component.html',
  styleUrls: ['./sign-in-dialog.component.scss']
})
export class SignInDialogComponent implements OnInit {

  signUpForm;
  btnLabel: string;

  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public dialogType: string) {
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, this.emailValidator]],
      pass: ['', [Validators.required, this.passwordValidator]],
      passConf: ['', [Validators.required, this.passwordConfirmationValidator]],
      conditions: [false, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.btnLabel = this.dialogType === 'sign up' ? 'join now' : 'let\'s invest';
  }

  onSubmit(customerData) {
    // Process checkout data here
    this.signUpForm.reset();

    console.warn('Your are Signed Up:', customerData);
  }

  emailValidator(control) {
    // RFC 2822 compliant regex
    if (
      control.value.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
    ) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }

  passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { invalidPassword: true };
    }
  }

  passwordConfirmationValidator(control) {

  }

}
