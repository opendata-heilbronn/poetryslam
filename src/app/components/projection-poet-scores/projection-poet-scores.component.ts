import { Component, OnInit, Input, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Asset } from 'src/app/models/asset';
import { Config } from 'src/app/models/config';
import { Poet } from 'src/app/models/poet';
import { Slide } from 'src/app/models/slide';
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

  highest: number | undefined;
  lowest: number | undefined;


  private _data: Slide | undefined;
  @Input("data") set data(value: Slide | undefined) {
    if (value === undefined)
      return;

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

    this.scores = this.poetService.SlideToScore(this._data, this._config);

    let remove_high_low = this._data.fields.find((m: any) => m.id == 'remove_high_low');
    if (remove_high_low !== undefined && remove_high_low.value === true) {
      let h = 0;
      let l = 11;
      
      for (let i = 0; i < this.scores.length; i++) {
        if (this.scores[i] > h) {
          this.highest = i;
          h = this.scores[i];
        }

        if (this.scores[i] < l) {
          this.lowest = i;
          l = this.scores[i];
        }
      }

      console.log("highest: " + h + " - position: " + this.highest);
      console.log("lowest: " + l + " - position: " + this.lowest);
    } else {
      this.lowest = undefined;
      this.highest = undefined;
    }

    console.log(this.scores);

  }
  get data(): any | undefined {
    return this._data;
  }

  private _config: Config | undefined;
  @Input("config") set config(value: Config | undefined) {
    this._config = value;

    if (this.scores.length === 0 && this._config !== undefined && this._config.countJury !== undefined) {
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
