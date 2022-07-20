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
    this.dataService.Remove();
  }

  exportEvent() {
    let fileContent = JSON.stringify(this.dataService._data);

    fileContent = this.encodeSpecialChars(fileContent);

    console.log("file content", fileContent);

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

  sCharsList = [
    { d: "ü", e: "&uuml;" },
    { d: "ä", e: "&auml;" },
    { d: "ö", e: "&ouml;" },
    { d: "Ü", e: "&Uuml;" },
    { d: "Ä", e: "&Auml;" },
    { d: "Ö", e: "&Ouml;" },
  ];

  private encodeSpecialChars(str: string): string {
    
    for (let i = 0; i < this.sCharsList.length; i++) {
      let regex = new RegExp(this.sCharsList[i].d, "g");
      str = str.replace(regex, this.sCharsList[i].e);
    }
    
    return str;
  }

  private decodeSpecialChars(str: string): string {

    for (let i = 0; i < this.sCharsList.length; i++) {
      let regex = new RegExp(this.sCharsList[i].e, "g");
      str = str.replace(regex, this.sCharsList[i].d);
    }
    
    return str;
  }

  importEvent(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let jsonString = atob((reader.result as string).replace("data:application/json;base64,", ""));
      let decodedString = this.decodeSpecialChars(jsonString);
      console.log(decodedString);
      let data = JSON.parse(decodedString);
      console.log(data);
      this.dataService.Load(data);
    };
  }

}