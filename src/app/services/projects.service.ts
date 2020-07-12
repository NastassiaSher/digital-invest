import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {Observable, from, BehaviorSubject} from 'rxjs';
import {ProjectItem} from '../models/project-item.model';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  projectsList: BehaviorSubject<Array<ProjectItem>> = new BehaviorSubject([]);

  constructor(private http: HttpClient, private storageService: LocalStorageService) { }

  private getProjectsList(): Observable<any> {
    return from(this.http.get<any>('/api/getProjectsList'));
  }

  callGetProjects(): void {
    const projects = this.storageService.get('projectsList');
    if (!projects) {
      this.getProjectsList().subscribe(res => {
        this.projectsList.next(res.body.projectsList);
        this.storageService.set('projectsList', this.projectsList.value);
      });
    }
    this.projectsList.next(projects);
  }

  setProjectsOnStorage(projectsList): void {
    this.storageService.set('projectsList', projectsList);
    this.projectsList.next(this.getProjectsFromStorage());
  }

  getProjectsFromStorage(): Array<ProjectItem> {
    return this.storageService.get('projectsList');
  }

  getProjectsById(): void {
    const projects = this.storageService.get('projectsList');
    const userData = this.storageService.get(this.storageService.get('currentUser'));
    userData.investments = new Map(Object.entries(userData.investments));
    const usersProjects = [];
    projects.forEach((project) => {
      if (userData.investments.has(project.projectId)) {
        usersProjects.push(project);
        usersProjects[usersProjects.length - 1].inv = userData.investments.get(project.projectId);
      }
    });
    this.projectsList.next(usersProjects);
  }

}
