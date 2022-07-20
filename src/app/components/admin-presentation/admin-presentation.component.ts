import { Component, OnInit } from '@angular/core';
import { group } from 'console';
import { Config } from 'src/app/models/config';
import { Eventdata } from 'src/app/models/eventdata';
import { Slide } from 'src/app/models/slide';
import { ConfigService } from 'src/app/services/config.service';
import { DataService } from 'src/app/services/data.service';
import { PoetService } from 'src/app/services/poet.service';

@Component({
  selector: 'app-admin-presentation',
  templateUrl: './admin-presentation.component.html',
  styleUrls: ['./admin-presentation.component.scss']
})
export class AdminPresentationComponent implements OnInit {

  private _config: Config | undefined;

  slides: Slide[] = [
    { id: "blank", name: "Blank - Black Screen", fields: [], fadeOut: false },
    { id: "event_name_announcement", name: "Event Name Announcement", fields: [], fadeOut: false },
    { id: "asset", name: "Show Asset", fields: [{ id: "asset_id", name: "Asset", value: "", type: "asset[]" }], fadeOut: false },
    { id: "group_announcement", name: "Group Announcement", fields: [{ id: "group_id", name: "Group", value: "", type: "group[]" }], fadeOut: false },
    { id: "group_scores", name: "Group Scores", fields: [{ id: "group_id", name: "Group", value: "", type: "group[]" }, { id: "remove_high_low", name: "Remove Highest/Lowest", value: false, type: "bool" }, { id: "display_poets_count", name: "Display Poets", type: "increment", value: 0 }], fadeOut: false },
    { id: "poet_announcement", name: "Poet Name Announcement", fields: [{ id: "poet_id", name: "Poet", value: "", type: "poet[]" }], fadeOut: false },
    { id: "poet_scores", name: "Poet Scores", fields: [{ id: "poet_id", name: "Poet", value: "", type: "poet[]" }, { id: "remove_high_low", name: "Remove Highest/Lowest", value: true, type: "bool" }], fadeOut: false }
  ];

  slideProgram: Slide | undefined = undefined;
  slidePreview: Slide | undefined = undefined;

  constructor(
    private dataService: DataService,
    private poetService: PoetService,
    private configService: ConfigService
  ) {
    this.configService.config.subscribe(m => this._config = m);
  }

  ngOnInit(): void {
    this.slidePreview = this.dataService.Get("slidePreview");
    this.slideProgram = this.dataService.Get("slideProgram");

    let config: Config = this.dataService.Get("config");

    let poet_score_slide = this.slides.find(m => m.id == "poet_scores");

    if (poet_score_slide !== undefined && config != undefined && config.countJury != undefined) {
      for (let i = 0; i < config.countJury; i++) {
        poet_score_slide.fields.push({
          id: "jury_score_" + (i + 1), name: "Jury " + (i + 1), value: "", type: "number"
        });
      }
    }

  }

  updatePoetScores(slide: Slide) {

    let poet_id = slide.fields.find(m => m.id == "poet_id");

    if (poet_id !== undefined) {

      let scores = this.poetService.SlideToScore(slide, this._config);
      let poet = this.poetService.getPoet(poet_id.value);

      if (poet !== undefined && poet.group !== undefined) {

        if (poet.scores === undefined)
          poet.scores = [];

        console.log("updating poet score, group is " + poet.group);
        console.log("selected poet", poet);
        let group_id = poet.group;
        let poet_scores = poet.scores.find(m => m.group_id == group_id);

        if (poet_scores === undefined) {
          poet.scores.push({
            group_id: group_id,
            values: scores
          });
        } else {
          poet_scores.values = scores;
        }

        this.poetService.updatePoet(poet);
      }
      else
        console.warn("no group found");
    } else {
      console.warn("no poet found");
    }
  }

  update() {
    this.dataService.Update("slideProgram", this.slideProgram);
    this.dataService.Update("slidePreview", this.slidePreview);

    if (this.slidePreview !== undefined && this.slidePreview.id == 'poet_scores') {
      this.updatePoetScores(this.slidePreview);
    }


    if (this.slideProgram !== undefined && this.slideProgram.id == 'poet_scores') {
      this.updatePoetScores(this.slideProgram);
    }
  }

  toggle() {
    if (this.slideProgram !== undefined) {

      this.slideProgram.fadeOut = true;
      this.update();

      setTimeout(() => {
        let t = this.slideProgram;

        if (this.slideProgram !== undefined) {

          this.slideProgram.fadeOut = false;
          this.slideProgram = this.slidePreview;
          this.slidePreview = t;

          this.update();
        }
      }, 1000);
    }
  }

  selectPreview(slide: any) {
    this.slidePreview = JSON.parse(JSON.stringify(slide));
    this.update();
  }

  onChanged() {
    this.update();
  }



}
