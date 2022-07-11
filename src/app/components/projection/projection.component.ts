import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/models/config';
import { ConfigService } from 'src/app/services/config.service';
import { DataService } from 'src/app/services/data.service';
import { PoetService } from 'src/app/services/poet.service';

@Component({
  selector: 'app-projection',
  templateUrl: './projection.component.html',
  styleUrls: ['./projection.component.scss']
})
export class ProjectionComponent implements OnInit {

  data: any;
  config: Config | undefined;

  constructor(
    private dataService: DataService,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.configService.config.subscribe(c => {
      console.log("got new config from config service: ", c);
      this.config = c;
    });

    this.dataService.data.subscribe(d => {
      if (d){
        this.data = d.slideProgram;
      }
    });
  }

}