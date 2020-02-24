import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  electronFs = window.require('fs');
  electronPath = window.require('path');

  updaterSub: Subscription;
  project:BehaviorSubject<Project> = new BehaviorSubject<Project>(null);

  constructor() { }

  loadProject(path: string) {
    console.log("loading project " + path);

    this.electronFs.readFile(path, (err, data) => {
      if (err) {
        console.error(err);
      }

      let d = JSON.parse(data);
      console.log(d);

      if (!d.groups) { d.groups = []; }
      if (!d.poets) { d.poets = []; }
      if (!d.slides) { d.slides = []; }

      this.project.next(d);

      this.updaterSub = this.project.subscribe(m=>this.updateProjectFile(m));
    });
  }

  updateProjectFile(project: Project) {
    if (this.electronFs){
      this.electronFs.writeFileSync(project.projectfile, JSON.stringify(project));
    } else {
      console.log("could not update project file, fs not found")
    }
  }
}
