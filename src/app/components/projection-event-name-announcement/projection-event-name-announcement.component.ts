import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Config } from 'src/app/models/config';
import { AssetService } from 'src/app/services/asset.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-projection-event-name-announcement',
  templateUrl: './projection-event-name-announcement.component.html',
  styleUrls: ['./projection-event-name-announcement.component.scss']
})
export class ProjectionEventNameAnnouncementComponent implements OnInit {

  show: boolean = false;
  event: Config | undefined;

  private _data: any | undefined;
  @Input("data") set data(value: any | undefined) {
    this._data = value;

    if (this._data.id != "event_name_announcement") {
      this.show = false;
      return;
    }

    this.show = true;
  }
  get data(): any | undefined {
    return this._data;
  }

  private _config: Config | undefined;
  @Input("config") set config(value: Config | undefined) {
    this._config = value;


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
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.configService.config.subscribe(c => this.event = c);
  }

}
