import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Poet } from '../models/poet';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PoetService {

  private dataKey = "poets";

  _poets: Poet[] = [];
  poets: BehaviorSubject<Poet[]> = new BehaviorSubject<Poet[]>(this._poets);

  constructor(
    private dataService: DataService
  ) {
    this.dataService.data.subscribe(d => {
      if (d) {
        this._poets = d.poets;
        this.poets.next(this._poets);
      }
    });
  }

  addPoet(poet: Poet): Poet {
    this._poets.push(poet);
    this.poets.next(this._poets);
    this.dataService.update(this.dataKey, this._poets);
    return poet;
  }

  getPoet(id: string): Poet | undefined {
    return this._poets.find(m => m.id == id);
  }

  updatePoet(poet: Poet): Poet|undefined {
    let p = this._poets.find(m => m.id == poet.id);
    this.dataService.update(this.dataKey, this._poets);
    return p;
  }

  removePoet(poet: Poet) {
    this._poets = this._poets.filter(m => m.id != poet.id);
    this.dataService.update(this.dataKey, this._poets);
  }

}
