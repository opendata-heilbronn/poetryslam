import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import Drawflow from 'drawflow'

@Component({
  selector: 'app-admin-groups',
  templateUrl: './admin-groups.component.html',
  styleUrls: ['./admin-groups.component.scss']
})
export class AdminGroupsComponent implements OnInit, AfterViewInit {

  @ViewChild("drawflow")
  flowDomElement: ElementRef | undefined;

  editor: Drawflow | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    if (this.flowDomElement) {
      console.log("init drawflow")
      console.log(this.flowDomElement.nativeElement);

      this.editor = new Drawflow(this.flowDomElement.nativeElement);
      this.editor.reroute = true;
      this.editor.reroute_fix_curvature = true;
      this.editor.force_first_input = false;
      this.editor.start();

      const dataToImport = {
        "drawflow":
        {
          "Home":
          {
            "data": {
              "1": { "id": 1, "name": "welcome", "data": {}, "class": "welcome", "html": "<h3>test</h3>", "typenode": false, "inputs": {}, "outputs": {}, "pos_x": 50, "pos_y": 50 },
            }
          }
        }
      };
      this.editor.import(dataToImport);


    } else {
      console.log("drawflow element not found");
    }

  }

}
