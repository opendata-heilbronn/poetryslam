import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui-progress-ring',
  templateUrl: './ui-progress-ring.component.html',
  styleUrls: ['./ui-progress-ring.component.scss']
})
export class UiProgressRingComponent implements OnInit {

  @Input("value")
  value: number = 0;

  @Input("background")
  background: string = "#17242b";

  @Input("foreground")
  foreground: string = "#471a91";

  backgroundOuterRing = "";

  constructor() { }

  ngOnInit(): void {

    setInterval(() => {
      this.setValue(this.value);
    }, 50);

    console.log(this.value);
    this.setValue(this.value);
  }

  setValue(val: number) {
    if (val < 0) {
      val = 0;
    }

    if (val > 100) {
      val = 100;
    }

    let rot = (val * 3.6);
    this.backgroundOuterRing = "conic-gradient( " + this.foreground + " " + rot + "deg,  " + this.background + " " + rot + "deg 350deg)";
  }

}
