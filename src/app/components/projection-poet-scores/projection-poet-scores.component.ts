import { Component, OnInit, Input, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Asset } from 'src/app/models/asset';
import { Config } from 'src/app/models/config';
import { Poet } from 'src/app/models/poet';
import { AssetService } from 'src/app/services/asset.service';
import { PoetService } from 'src/app/services/poet.service';

@Component({
  selector: 'app-projection-poet-scores',
  templateUrl: './projection-poet-scores.component.html',
  styleUrls: ['./projection-poet-scores.component.scss']
})
export class ProjectionPoetScoresComponent implements OnInit {

  scores: number[] = [];

  show: boolean = false;
  poet: Poet | undefined;


  private _data: any | undefined;
  @Input("data") set data(value: any | undefined) {
    this._data = value;

    if (this._data.id != "poet_scores") {
      this.show = false;
      return;
    }

    this.show = !this._data.fadeOut;

    let poet_id = this._data.fields.find((m: any) => m.id == 'poet_id');

    if (poet_id) {
      this.poet = this.poetService.getPoet(poet_id.value);
    }

    if (this._config && this._config.countJury) {
      for (let i = 0; i < this._config.countJury; i++) {

        let s = this._data.fields.find((m: any) => m.id == "jury_score_" + (i + 1));
        if (s != undefined && s.value !== undefined && s.value !== "") {
          this.scores[i] = s.value;
        } else {
          this.scores[i] = -1;
          console.log("score " + i + " is undefined")
        }
      }
    }

    console.log(this.scores);

  }
  get data(): any | undefined {
    return this._data;
  }

  private _config: Config | undefined;
  @Input("config") set config(value: Config | undefined) {
    this._config = value;

    if (this.scores.length == 0 && this._config && this._config.countJury) {
      for (let i = 0; i < this._config.countJury; i++) {
        this.scores.push(-1);
      }
    }

    if (this._config && this._config.backgroundImage) {
      let asset = this.assetService.getAsset(this._config.backgroundImage);

      if (asset) {
        let url = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.sanitizer.bypassSecurityTrustResourceUrl(asset.data))
        this.bgImage = url ? 'url(' + url + ')' : "";
      }
    }
  }
  get config(): Config | undefined {
    return this._config;
  }


  bgImage = "";

  constructor(
    private sanitizer: DomSanitizer,
    private assetService: AssetService,
    private poetService: PoetService
  ) { }

  ngOnInit(): void { }

}
