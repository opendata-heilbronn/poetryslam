import { Component, OnInit } from '@angular/core';
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

  countPoets(group_id: string | undefined): number {
    if (group_id) {
      return this.poets.filter(m => m.group == group_id).length;
    }

    return -1;
  }

  update(group: Group) {
    this.groupService.Update(group);
  }

  remove(id: string | undefined) {
    // this.poetService.removePoet(poet);
  }
}
