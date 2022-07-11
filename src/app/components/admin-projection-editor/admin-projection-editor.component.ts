import { Component, Input, OnInit } from '@angular/core';
import { Asset } from 'src/app/models/asset';
import { Eventdata } from 'src/app/models/eventdata';
import { Group } from 'src/app/models/group';
import { Poet } from 'src/app/models/poet';
import { AssetService } from 'src/app/services/asset.service';
import { DataService } from 'src/app/services/data.service';
import { GenericDataService } from 'src/app/services/generic-data.service';
import { PoetService } from 'src/app/services/poet.service';

@Component({
  selector: 'app-admin-projection-editor',
  templateUrl: './admin-projection-editor.component.html',
  styleUrls: ['./admin-projection-editor.component.scss']
})
export class AdminProjectionEditorComponent implements OnInit {

  poets: Poet[] = [];
  assets: Asset[] = [];
  groups: Group[] = [];

  private _slide: any | undefined;
  @Input("slide") set slide(value: any | undefined) {
    this._slide = value;
  }
  get slide(): any | undefined {
    return this._slide;
  }


  constructor(
    private poetService: PoetService,
    private assetService: AssetService,
    private groupService: GenericDataService<Group>
  ) {
    this.groupService.Init("groups");
  }

  ngOnInit(): void {
    this.poetService.poets.subscribe(p => this.poets = p);
    this.assetService.assets.subscribe(a => this.assets = a);
    this.groupService.data.subscribe(d => this.groups = d);
  }

  sortBy(arr: any[], key: string): any[] {
    return arr.sort((a, b) => {
      return a[key] > b[key] ? 1 : -1;
    });
  }

}
