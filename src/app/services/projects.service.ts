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
    this.getProjectsList().subscribe(res => {
      this.projectsList.next(res.body.projectsList);
      this.storageService.set('projectsList', this.projectsList.value);
    });
  }

  setProjectsOnStorage(projectsList): void {
    this.storageService.set('projectsList', projectsList);
    this.projectsList.next(this.getProjectsFromStorage());
  }

  getProjectsFromStorage(): Array<ProjectItem> {
    return this.storageService.get('projectsList');
  }

}
