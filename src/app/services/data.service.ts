import { ApplicationRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Eventdata } from '../models/eventdata';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private lskey = "slamware-data";

  _data: Eventdata | undefined = undefined;
  data: BehaviorSubject<Eventdata | undefined> = new BehaviorSubject<Eventdata | undefined>(this._data);


  constructor(
    private appRef: ApplicationRef
  ) {
    this.loadFromLocalStorage();

    window.addEventListener("storage", () => {
      console.log("change in ls detected");
      this.loadFromLocalStorage();
    }, false);
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.lskey, JSON.stringify(this._data));
    console.log("saved data to local storage");
  }

  private loadFromLocalStorage() {
    let s = localStorage.getItem(this.lskey);
    
    if (s) {
      console.log("loaded data from local storage");
      let d = JSON.parse(s);
      this._data = d;
      this.data.next(this._data);
      this.appRef.tick();
    } else {
      console.log("could not load data from local storage, creating new eventdata");
      this._data = new Eventdata();
      this.saveToLocalStorage();
    }
  }

  Get(key: string) {
    return (this._data as any)[key];
  }

  update(key: string, data: any) {
    (this._data as any)[key] = data;
    // this.data.next(this._data);
    this.saveToLocalStorage();
  }

}
