import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Config } from '../models/config';
import { MessageType } from '../models/message';
import { DataService } from './data.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private dataKey = "config";

  _config: Config | undefined = undefined;
  config: BehaviorSubject<Config | undefined> = new BehaviorSubject<Config | undefined>(this._config);


  constructor(
    private dataService: DataService
  ) {
    this.dataService.data.subscribe(d => {
      if (d) {
        this._config = d.config;
        this.config.next(this._config);
        console.log("got new config data from data service");
      }
    });
  }


  update(config: Config) {
    this.dataService.Update(this.dataKey, config);
  }
}