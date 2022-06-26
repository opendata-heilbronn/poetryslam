import { Component, OnInit, Input } from '@angular/core';
// import { ElectronService } from 'ngx-electron';
import { Eventdata } from 'src/app/models/eventdata';

// import { readFileSync } from 'fs';

@Component({
  selector: 'app-projection-poet',
  templateUrl: './projection-poet.component.html',
  styleUrls: ['./projection-poet.component.scss']
})
export class ProjectionPoetComponent implements OnInit {

  @Input("data")
  event: Eventdata | undefined;

  image: string = "";

  constructor() {
  }

  ngOnInit(): void {
    let path = "~/Pictures/EoFGpm9XMAYKjoX.jpeg";
    // this.image = readFileSync(path).toString('base64');

  }

}
