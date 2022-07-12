import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Config } from 'src/app/models/config';
import { AssetService } from 'src/app/services/asset.service';

@Component({
  selector: 'app-projection-asset',
  templateUrl: './projection-asset.component.html',
  styleUrls: ['./projection-asset.component.scss']
})
export class ProjectionAssetComponent implements OnInit {

  show = false;

  private _data: any | undefined;
  @Input("data") set data(value: any | undefined) {
    this._data = value;

    if (this._data.id != "asset") {
      this.show = false;
      return;
    }

    this.show = !this._data.fadeOut;

    console.log(this._data);
    let asset_id = this._data.fields.find((m: any) => m.id == 'asset_id');
    if (asset_id) {
      let asset = this.assetService.getAsset(asset_id.value);

      if (asset) {
        this.asset = this.sanitizer.bypassSecurityTrustUrl(asset.data);
      }
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

  asset: any;


  constructor(
    private sanitizer: DomSanitizer,
    private assetService: AssetService
  ) { }

  ngOnInit(): void {
  }

}
