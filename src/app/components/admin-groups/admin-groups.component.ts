import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import Drawflow from 'drawflow'
import { Group } from 'src/app/models/group';
import { Poet } from 'src/app/models/poet';
import { GenericDataService } from 'src/app/services/generic-data.service';

import { PoetService } from 'src/app/services/poet.service';

@Component({
  selector: 'app-admin-groups',
  templateUrl: './admin-groups.component.html',
  styleUrls: ['./admin-groups.component.scss']
})
export class AdminGroupsComponent implements OnInit {

  poets: Poet[] = []
  groups: Group[] = [];

  constructor(
    private poetService: PoetService,
    private groupService: GenericDataService<Group>
  ) {
    this.groupService.Init("groups");
  }

  ngOnInit(): void {
    this.poetService.poets.subscribe(p => this.poets = p);
    this.groupService.data.subscribe(d => this.groups = d);
  }

  add() {
    let g = new Group();
    g.id = crypto.randomUUID();
    this.groupService.Add(g);
  }

  update(group: Group) {
    this.groupService.Update(group);
  }

  remove(id: string | undefined) {
    // this.poetService.removePoet(poet);
  }
}