import { Component, OnInit } from '@angular/core';
import {ProjectsService} from '../services/projects.service';
import {BehaviorSubject} from 'rxjs';
import {ProjectItem} from '../models/project-item.model';
import {InvestmentService} from '../services/investment.service';
import {InvestmentData} from '../models/investment-data.model';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {

  projectsList: BehaviorSubject<Array<ProjectItem>> = new BehaviorSubject([]);

  constructor(private projectsService: ProjectsService, private investmentService: InvestmentService) { }

  ngOnInit(): void {
    this.projectsService.callGetProjects();
    this.projectsService.projectsList.subscribe(val => {
      this.projectsList.next(val);
    });
    console.log(this.projectsList);
  }

  startInvestmentProcess(investmentData: InvestmentData) {
    this.investmentService.startInvestmentProcess(investmentData);
  }

}
