import { Injectable } from '@angular/core';
import {AuthorizationService} from './authorization.service';
import {ProjectsService} from './projects.service';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  constructor(private authService: AuthorizationService, private projectsService: ProjectsService, private storageService: LocalStorageService) { }

  startInvestmentProcess(investmentData): void {
    const currUser = this.authService.getUser();
    // check if user logged in
    if (!currUser) {
      // TODO show login/reg modal: 'Please Log in!'
    } else {
      // set new data for project
      this.setNewDataForProject(investmentData);
      // set new data for user
      this.setNewDataForUser(currUser, investmentData);
    }
  }

  setNewDataForProject(investmentData): void {
    const projects = this.projectsService.getProjectsFromStorage();
    for (const project of projects) {
      if (project.projectId === investmentData.projectId) {
        project.availableAmount = project.availableAmount - investmentData.investedAmount;
        break; // check if break works in this loop
      }
    }
    this.projectsService.setProjectsOnStorage(projects);
  }

  setNewDataForUser(user, investmentData): void {
    const userData = this.storageService.get(user);
    if (userData.investments.has(investmentData.projectId)) {
      const totalInvAmount = userData.investments.get(investmentData.projectId) + investmentData.investedAmount;
      userData.investments.set(investmentData.projectId, totalInvAmount);
    }
    this.storageService.set(user, userData);
  }
}
