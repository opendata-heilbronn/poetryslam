import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Config } from '../models/config';
import { Poet } from '../models/poet';
import { Slide } from '../models/slide';
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
    this.dataService.Update(this.dataKey, this._poets);
    return poet;
  }

  getPoet(id: string): Poet | undefined {
    return this._poets.find(m => m.id == id);
  }

  updatePoet(poet: Poet): Poet | undefined {
    let p = this._poets.find(m => m.id == poet.id);
    this.dataService.Update(this.dataKey, this._poets);
    return p;
  }

  removePoet(poet: Poet) {
    this._poets = this._poets.filter(m => m.id != poet.id);
    this.dataService.Update(this.dataKey, this._poets);
  }

  SlideToScore(slide: Slide | undefined, config: Config | undefined): number[] {

    let scores = [];

    if (slide && config && config.countJury) {
      for (let i = 0; i < config.countJury; i++) {

        let s = slide.fields.find((m: any) => m.id == "jury_score_" + (i + 1));
        if (s != undefined && s.value !== undefined && s.value !== "") {
          scores[i] = s.value;
        } else {
          scores[i] = -1;
          console.log("score " + i + " is undefined")
        }
      }
    }

    return scores;
  }

  GetScoreSum(poet: Poet | undefined, config: Config | undefined, remove_high_low: boolean = false) : number {
    // let scores = this.SlideToScore(slide, config);

    return -1;

  }

}
