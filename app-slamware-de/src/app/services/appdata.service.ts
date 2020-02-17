import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { remote } from 'electron';
import { Appdata } from '../models/appdata';

@Injectable({
  providedIn: 'root'
})
export class AppdataService {

  appDirName: string = "slamware";
  appDirPath: string;

  appDataFileName: string = "data.json";
  appDataFilePath: string;

  AppData: BehaviorSubject<Appdata> = new BehaviorSubject<Appdata>(null);

  electronFs = window.require('fs');
  electronPath = window.require('path');


  constructor() {
    this.appDirPath = this.electronPath.join(remote.app.getPath("appData"), this.appDirName);

    this.createDataDirIfNotExist();
    this.createJsonIfNotExist();

    this.electronFs.readFile(this.appDataFilePath, (err, data) => {
      if (err) {
        console.error(err);
      }

      let d = JSON.parse(data);
      this.AppData.next(d);

      this.AppData.subscribe(d => this.saveAppData(d));
    });
  }

  saveAppData(data: Appdata) {
    this.electronFs.writeFileSync(this.appDataFilePath, JSON.stringify(data));
  }

  createJsonIfNotExist() {
    this.appDataFilePath = this.electronPath.join(this.appDirPath, this.appDataFileName);

    if (!this.electronFs.existsSync(this.appDataFilePath)) {
      this.electronFs.writeFileSync(this.appDataFilePath, JSON.stringify({ projects: [] }));
    }
  }

  createDataDirIfNotExist() {
    if (!this.electronFs.existsSync(this.appDirPath)) {
      console.log("app data path not exists - creating");
      this.electronFs.mkdirSync(this.appDirPath);
    }
  }

}
