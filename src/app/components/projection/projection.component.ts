import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Config } from 'src/app/models/config';
import { AssetService } from 'src/app/services/asset.service';
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

  bgImage = "";


  constructor(
    private sanitizer: DomSanitizer,
    private dataService: DataService,
    private configService: ConfigService,
    private assetService: AssetService,
  ) { }

  ngOnInit(): void {
    this.configService.config.subscribe(c => {
      console.log("got new config from config service: ", c);
      this.config = c;

      if (this.config && this.config.backgroundImage) {
        let asset = this.assetService.getAsset(this.config.backgroundImage);
  
        if (asset) {
          let url = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.sanitizer.bypassSecurityTrustResourceUrl(asset.data))
          this.bgImage = url ? 'url(' + url + ')' : "";
        }
      }
    });

    this.dataService.data.subscribe(d => {
      if (d){
        this.data = d.slideProgram;
      }
    });
  }

}