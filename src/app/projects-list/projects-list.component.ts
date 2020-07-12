import {Component, Input, OnInit} from '@angular/core';
import {ProjectsService} from '../services/projects.service';
import {BehaviorSubject} from 'rxjs';
import {ProjectItem} from '../models/project-item.model';
import {InvestmentService} from '../services/investment.service';
import {InvestmentData} from '../models/investment-data.model';
import {AuthorizationService} from '../services/authorization.service';
import {ModalService} from '../services/modal.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {

  projectsList: BehaviorSubject<Array<ProjectItem>> = new BehaviorSubject([]);
  @Input() flag;

  constructor(private projectsService: ProjectsService,
              private investmentService: InvestmentService,
              private authService: AuthorizationService,
              private modalService: ModalService) { }

  ngOnInit(): void {
    if (this.flag === 'profile') {
      this.projectsService.getProjectsById();
    } else {
      this.projectsService.callGetProjects();
    }
    this.projectsService.projectsList.subscribe(val => {
      this.projectsList.next(val);
    });
  }

  startInvestmentProcess(investmentData: InvestmentData): void {
    const currUser = this.authService.getUser();
    if (!currUser) {
      this.modalService.openSignUpModal();
    } else {
      this.investmentService.startInvestmentProcess(investmentData);
    }
  }

}
