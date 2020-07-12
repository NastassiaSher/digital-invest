import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InlineSVGModule } from 'ng-inline-svg';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectItemComponent } from './projects-list/project-item/project-item.component';
import { MockedDataService } from '../mocks/mocked-data-service';
import {environment} from '../environments/environment';
import { SignInDialogComponent } from './sign-in-dialog/sign-in-dialog.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationDialogComponent } from './notification-dialog/notification-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProjectsListComponent,
    ProjectItemComponent,
    SignInDialogComponent,
    ProfileComponent,
    NotificationDialogComponent
  ],
  imports: [
    BrowserModule,
    InlineSVGModule,
    HttpClientModule,
    environment.mockBackend ? HttpClientInMemoryWebApiModule.forRoot(MockedDataService,
      {
        delay: 1000,
        passThruUnknownUrl: true,
      }) : [],
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatDialogModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
