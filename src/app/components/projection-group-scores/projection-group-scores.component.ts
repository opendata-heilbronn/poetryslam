
import { Component, OnInit, Input, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Config } from 'src/app/models/config';
import { Group } from 'src/app/models/group';
import { Poet } from 'src/app/models/poet';
import { AssetService } from 'src/app/services/asset.service';
import { GenericDataService } from 'src/app/services/generic-data.service';
import { PoetService } from 'src/app/services/poet.service';

@Component({
  selector: 'app-projection-group-scores',
  templateUrl: './projection-group-scores.component.html',
  styleUrls: ['./projection-group-scores.component.scss']
})
export class ProjectionGroupScoresComponent implements OnInit {

  show: boolean = false;
  poets: Poet[] | undefined;
  group: Group | undefined;
  poets_show_count = 0;
  remove_high_low = true;


  private _data: any | undefined;
  @Input("data") set data(value: any | undefined) {
    this._data = value;

    if (this._data.id != "group_scores") {
      this.show = false;
      return;
    }

    this.show = !this._data.fadeOut;

    let group_id = this._data.fields.find((m: any) => m.id == 'group_id');
    this.poets_show_count = this._data.fields.find((m: any) => m.id == 'display_poets_count').value;
    this.remove_high_low = this._data.fields.find((m: any) => m.id == 'remove_high_low').value;


    if (group_id) {
      console.log("gid", group_id)

      this.group = this.groupService.Get(group_id.value);

      console.log("group", this.group);

      this.poets = this.poetService._poets.filter(m => m.group == group_id.value);
    }

  }
  get data(): any | undefined {
    return this._data;
  }

  private _config: Config | undefined;
  @Input("config") set config(value: Config | undefined) {
    this._config = value;
  }
  get config(): Config | undefined {
    return this._config;
  }


  bgImage = "";

  constructor(
    private sanitizer: DomSanitizer,
    private assetService: AssetService,
    private poetService: PoetService,
    private groupService: GenericDataService<Group>

  ) {
    this.groupService.Init("groups");
  }

  ngOnInit(): void { }


  getScore(poet: Poet) {

    let group_id = poet.group;

    if (group_id === undefined)
      return 0;

    if (poet.scores == undefined)
      return 0;

    let scores = poet.scores.find(m => m.group_id == group_id);

    if (scores == undefined)
      return 0;

    let highest = -1;
    let lowest = -1;

    if (this.remove_high_low === true) {
      let h = 0;
      let l = 11;

      for (let i = 0; i < scores.values.length; i++) {
        if (scores.values[i] > h) {
          highest = i;
          h = scores.values[i];
        }

        if (scores.values[i] < l) {
          lowest = i;
          l = scores.values[i];
        }
      }
    }

    let sum = 0;

    scores.values.forEach((m: any, i: number) => {
      if (m != undefined && m != "") {
        if (i != highest && i != lowest) {
          sum += m;
        }
      }
    });


    return sum;
  }

  orderPoets(poets: Poet[] | undefined) {
    if (poets === undefined)
      return [];

    let sorted =  poets.sort((a:Poet, b:Poet) => {

      let a_sum = this.getScore(a);
      let b_sum = this.getScore(b);

      return b_sum - a_sum;

    });

    console.log(sorted);

    return sorted;
  }

}