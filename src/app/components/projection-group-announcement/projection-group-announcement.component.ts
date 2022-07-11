import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Config } from 'src/app/models/config';
import { Group } from 'src/app/models/group';
import { AssetService } from 'src/app/services/asset.service';
import { ConfigService } from 'src/app/services/config.service';
import { GenericDataService } from 'src/app/services/generic-data.service';

@Component({
  selector: 'app-projection-group-announcement',
  templateUrl: './projection-group-announcement.component.html',
  styleUrls: ['./projection-group-announcement.component.scss']
})
export class ProjectionGroupAnnouncementComponent implements OnInit {

  show: boolean = false;
  event: Config | undefined;
  group: Group | undefined;
  groups: Group[] = [];

  private _data: any | undefined;
  @Input("data") set data(value: any | undefined) {
    this._data = value;

    if (this._data.id != "group_announcement") {
      this.show = false;
      return;
    }

    this.show = true;
    console.log(this._data);

    let group_id = this._data.fields.find((m: any) => m.id == 'group_id');

    if (group_id) {
      this.group = this.groupService.Get(group_id.value);
    }
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
    private configService: ConfigService,
    private groupService: GenericDataService<Group>
  ) {
    this.groupService.Init("groups");
  }

  ngOnInit(): void {
    this.configService.config.subscribe(c => this.event = c);
    this.groupService.data.subscribe(d => this.groups = d);
  }

}
