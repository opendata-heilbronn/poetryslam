import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Poet } from '../models/poet';

@Injectable({
  providedIn: 'root'
})
export class PoetService {

  _poets: Poet[] = [
    {
      id: "935a4a65-ca8a-41c8-bb48-db348ae61680",
      name: "Frodo Baggins",
      slam: "bags end",
      image: ""
    }
  ];
  poets: BehaviorSubject<Poet[]> = new BehaviorSubject<Poet[]>(this._poets);

  constructor() { }

  addPoet(poet: Poet): Poet {
    this._poets.push(poet);
    this.poets.next(this._poets);

    return poet;
  }

  getPoet(id: string): Poet | undefined {
    return this._poets.find(m => m.id == id);
  }

}
