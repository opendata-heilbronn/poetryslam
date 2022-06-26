import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Round } from '../models/round';

@Injectable({
  providedIn: 'root'
})
export class RoundService {

  _rounds: Round[] = [];
  rounds: BehaviorSubject<Round[]> = new BehaviorSubject<Round[]>(this._rounds);

  constructor() { }

  addRound(round: Round): Round {
    this._rounds.push(round);
    this.rounds.next(this._rounds);

    return round;
  }

  getRound(id: string): Round | undefined {
    return this._rounds.find(m => m.id == id);
  }

  removeRound(round: Round) {
    this._rounds = this._rounds.filter(m=>m.id != round.id);
    this.rounds.next(this._rounds);
  }
}
