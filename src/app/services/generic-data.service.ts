import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class GenericDataService<T> {

  private dataKey = "data-key-not-specified";

  _data: T[] = [];
  data: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  constructor(
    private dataService: DataService
  ) { }

  Init(_dataKey: string) {
    this.dataKey = _dataKey;

    this.dataService.data.subscribe(d => {
      if (d) {
        this._data = this.dataService.Get(this.dataKey);
        this.data.next(this._data);
      }
    });
  }

  Add(entry: T): T {
    if (this._data == undefined) {
      this._data = [];
    }

    this._data.push(entry);
    this.data.next(this._data);
    this.dataService.update(this.dataKey, this._data);
    return entry;
  }

  Get(id: string): T | undefined {
    return this._data.find(m => {
      if ((m as any).id == id) {
        return true;
      }

      return false;
    });
  }

  Update(entry: T): T | undefined {

    let p = this.Get((entry as any).id)

    let keys = Object.keys((p as any));

    keys.forEach(key => {
      (p as any)[key] = (entry as any)[key];
    });

    this.dataService.update(this.dataKey, this._data);
    return p;
  }

  Remove(entry: T) {
    this._data = this._data.filter(m => (m as any).id != (entry as any).id);
    this.dataService.update(this.dataKey, this._data);
  }
}
