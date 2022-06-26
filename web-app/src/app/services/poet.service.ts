import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message, MessageType } from '../models/message';
import { Poet } from '../models/poet';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class PoetService {

  private lskey = "slamware-data-poets";

  _poets: Poet[] = [];
  poets: BehaviorSubject<Poet[]> = new BehaviorSubject<Poet[]>(this._poets);

  constructor(
    private msgService: MessageService
  ) {
    let s = localStorage.getItem(this.lskey);
    if  (s) {
      let p = JSON.parse(s);
      this._poets = p;
      this.poets.next(this._poets);
    }

  }

  private saveToLocalStorage() {
    localStorage.setItem(this.lskey, JSON.stringify(this._poets));
  }

  addPoet(poet: Poet): Poet {
    this._poets.push(poet);
    this.poets.next(this._poets);

    this.msgService.SendMessage({ type: MessageType.DataUpdate, data: {poets: this._poets }});
    this.saveToLocalStorage();

    return poet;
  }

  getPoet(id: string): Poet | undefined {
    return this._poets.find(m => m.id == id);
  }

  updatePoet(poet: Poet): Poet|undefined {
    let p = this._poets.find(m => m.id == poet.id);
    if (p) {
      p.name = poet.name;
      p.slam = poet.slam;
    }

    this.msgService.SendMessage({ type: MessageType.DataUpdate, data: {poets: this._poets }});
    this.saveToLocalStorage();

    return p;
  }

  removePoet(poet: Poet) {
    this._poets = this._poets.filter(m=>m.id != poet.id);
    this.poets.next(this._poets);
   
    this.msgService.SendMessage({ type: MessageType.DataUpdate, data: {poets: this._poets }});
    this.saveToLocalStorage();
  }

}
