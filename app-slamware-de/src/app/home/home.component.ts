import { Component, OnInit } from '@angular/core';
import { ipcRenderer } from 'electron';
import { Slide } from '../models/slide';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

  
  data = "";

  public sendData() {
    let slide: Slide = {
      type: "customText",
      data: {
        header: this.data,
        subline: "foobar"
      }
    };

    ipcRenderer.send('updateData', slide);
  }


}
