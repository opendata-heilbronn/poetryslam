import { Component, OnInit } from '@angular/core';
import { Round } from 'src/app/models/round';
import { RoundService } from 'src/app/services/round.service';

@Component({
  selector: 'app-admin-rounds',
  templateUrl: './admin-rounds.component.html',
  styleUrls: ['./admin-rounds.component.scss']
})
export class AdminRoundsComponent implements OnInit {

  rounds: Round[] = [];

  constructor(
    private roundService: RoundService
  ) { }

  ngOnInit(): void {
    this.roundService.rounds.subscribe(r => this.rounds = r);
  }

  add() {
    let r = new Round();
    r.id = crypto.randomUUID();
    this.roundService.addRound(r);
  }

  remove(round: Round) {
    this.roundService.removeRound(round);
  }

}
