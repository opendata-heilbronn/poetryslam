import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/models/config';
import { Eventdata } from 'src/app/models/eventdata';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-admin-presentation',
  templateUrl: './admin-presentation.component.html',
  styleUrls: ['./admin-presentation.component.scss']
})
export class AdminPresentationComponent implements OnInit {

  slides: any[] = [
    { id: "blank", name: "Blank - Black Screen", fields: [] },
    { id: "event_name_announcement", name: "Event Name Announcement", fields: [] },
    { id: "asset", name: "Show Asset", fields: [{ id: "asset_id", name: "Asset", value: "", type: "asset[]" }] },
    { id: "group_announcement", name: "Group Announcement", fields: [{ id: "group_id", name: "Group", value: "", type: "group[]" }] },
    { id: "group_scores", name: "Group Scores", fields: [{ id: "group_id", name: "Group", value: "", type: "group[]" }] },
    { id: "poet_announcement", name: "Poet Name Announcement", fields: [{ id: "poet_id", name: "Poet", value: "", type: "poet[]" }] },
    { id: "poet_scores", name: "Poet Scores", fields: [{ id: "poet_id", name: "Poet", value: "", type: "poet[]" }], actions: [{ id: "poet_scores_remove_highest_lowest", name: "Remove Highest/Lowest Score" }] },
    { id: "winners", name: "Show Winners", fields: [], actions: [{ id: "winners_next", name: "Reveal Next Winner" }] }
  ];

  slideProgram: any = undefined;
  slidePreview: any = undefined;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.slidePreview = this.dataService.Get("slidePreview");
    this.slideProgram = this.dataService.Get("slideProgram");

    let config: Config = this.dataService.Get("config");

    let poet_score_slide = this.slides.find(m => m.id == "poet_scores");

    if (config != undefined && config.countJury != undefined) {
        for (let i = 0; i < config.countJury; i++) {
          poet_score_slide.fields.push({
            id: "jury_score_" + (i+1), name: "Jury " + (i+1), value: "", type: "number"
          });
        }
      }

  }

  update() {
    this.dataService.update("slideProgram", this.slideProgram);
    this.dataService.update("slidePreview", this.slidePreview);
  }

  toggle() {
    this.slideProgram.fadeOut = true;
    this.update();

    setTimeout(() => {
      let t = this.slideProgram;
      t.fadeOut = false;
      this.slideProgram = this.slidePreview;
      this.slidePreview = t;
  
      this.update();
    }, 1000);
  }

  selectPreview(slide: any) {
    this.slidePreview = JSON.parse(JSON.stringify(slide));
    this.update();
  }

  onChanged() {
    this.update();
  }



}
