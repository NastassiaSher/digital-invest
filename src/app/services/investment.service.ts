import { Injectable } from '@angular/core';
import {AuthorizationService} from './authorization.service';
import {ProjectsService} from './projects.service';
import {LocalStorageService} from './local-storage.service';
import {ModalService} from './modal.service';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  constructor(private authService: AuthorizationService,
              private projectsService: ProjectsService,
              private storageService: LocalStorageService,
              private modalService: ModalService) { }

  startInvestmentProcess(investmentData): void {
    const currUser = this.authService.getUser();
    const userData = this.storageService.get(currUser);
    // check if user logged in
    if (currUser){
      if (!userData.investments[investmentData.projectId]) {
        // set new data for project
        this.setNewDataForProject(investmentData);
        // set new data for user
        this.setNewDataForUser(currUser, userData, investmentData);
        this.modalService.openInfoModal({
          title: 'Investment',
          message: 'Success!'
        });
      } else {
        this.modalService.openInfoModal({
          title: 'Investment',
          message: 'You\'ve already invested in this project.'
        });
      }
    }
  }

  setNewDataForProject(investmentData): void {
    const projects = this.projectsService.getProjectsFromStorage();
    for (const project of projects) {
      if (project.projectId === investmentData.projectId) {
        project.availableAmount = project.availableAmount - investmentData.investedAmount;
        break;
      }
    }
    this.projectsService.setProjectsOnStorage(projects);
  }

  setNewDataForUser(currUser, userData, investmentData): void {
    userData.investments[investmentData.projectId] = investmentData.investedAmount;
    this.storageService.set(currUser, userData);
  }
}
