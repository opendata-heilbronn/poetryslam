import { Component, Input, OnInit } from '@angular/core';
import { Config } from 'src/app/models/config';

@Component({
  selector: 'app-projection-blank',
  templateUrl: './projection-blank.component.html',
  styleUrls: ['./projection-blank.component.scss']
})
export class ProjectionBlankComponent implements OnInit {


  private _data: any | undefined;
  @Input("data") set poet(value: any | undefined) {
    this._data = value;
  }
  get poet(): any | undefined {
    return this._data;
  }

  private _config: Config | undefined;
  @Input("config") set config(value: Config | undefined) {
    this._config = value;
  }
  get config(): Config | undefined {
    return this._config;
  }

  @Input("show")
  show: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

}
