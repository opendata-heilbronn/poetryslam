import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Config } from 'src/app/models/config';
import { ConfigService } from 'src/app/services/config.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss']
})
export class AdminSettingsComponent implements OnInit {

  config: Config | undefined = undefined;
  configKeys: string[] = [];

  constructor(
    private configService: ConfigService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.configService.config.subscribe(c => {
      this.config = c;
      if (c != undefined) {
        this.configKeys = Object.keys(c);
      } else {
        this.configKeys = [];
      }
    });
  }

  getValue(key: string) {
    return (this.config as any)[key];
  }

  create() {
    this.config = new Config();

    console.log(this.config);

    this.configKeys = Object.keys(this.config);
    this.configService.update(this.config);
  }

  update($event: any, key: string) {
    if (this.config != undefined) {
      console.log($event);
      console.log($event.target.value);

      (this.config as any)[key] = $event.target.value;

      this.configService.update(this.config);
    }
  }

  remove(key: string) {

  }

  resetEvent() {
    this.create();
  }

  exportEvent() {
    let fileContent = JSON.stringify(this.dataService._data);

    if (this.config) {

      let timestamp = moment().format("YYYY-MM-DD");
      let exportFileDefaultName = 'export_' + (this.config.name)?.replace(" ", "_") + "_" + timestamp + '.json';

      let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(fileContent);
      let linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }
  }

  importEvent(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {

      // console.log(file);
      // console.log(reader.result);

      let data = JSON.parse(atob((reader.result as string).replace("data:application/json;base64,", "")));
      console.log(data);

      // let asset: Asset = {
      //   id: crypto.randomUUID(),
      //   name: file.name,
      //   type: file.type,
      //   data: reader.result,
      //   dataUrl: undefined
      // };

      // this.assetService.addAsset(asset);
    };
  }

}