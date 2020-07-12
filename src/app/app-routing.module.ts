import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProjectsListComponent} from './projects-list/projects-list.component';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
  { path: '', component: ProjectsListComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
