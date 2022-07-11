import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/group';
import { Poet } from 'src/app/models/poet';
import { GenericDataService } from 'src/app/services/generic-data.service';
import { MessageService } from 'src/app/services/message.service';
import { PoetService } from 'src/app/services/poet.service';

@Component({
  selector: 'app-admin-poets',
  templateUrl: './admin-poets.component.html',
  styleUrls: ['./admin-poets.component.scss']
})
export class AdminPoetsComponent implements OnInit {

  poets: Poet[] = [];
  groups: Group[] = [];

  constructor(
    private poetService: PoetService,
    private groupService: GenericDataService<Group>,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.poetService.poets.subscribe(p => this.poets = p);
    this.groupService.data.subscribe(d => this.groups = d);
  }

  openPoet(poet: Poet) {
    // this.router.navigate(['/admin/poets/' + poet.id]);
  }

  add() {
    let p = new Poet();
    p.id = crypto.randomUUID();
    this.poetService.addPoet(p);
  }

  update(poet: Poet) {
    this.poetService.updatePoet(poet);
  }

  remove(poet: Poet) {
    this.poetService.removePoet(poet);
  }
}
