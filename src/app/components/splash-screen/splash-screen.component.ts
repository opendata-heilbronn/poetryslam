import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit {


  @Input("value")
  loaderValue: number = 0;

  @Input("background")
  background: string = "#17242b";

  constructor() { }

  ngOnInit(): void {
    this.consoleFadeGradient = "linear-gradient(rgba(23,36,43,0) 0%, " + this.background + " 50%)";

    setInterval(() => {
      this.setValue(this.loaderValue);
    }, 50);
  }

  consoleFadeGradient = "";
  sampleEntries = [
    "Suche Worte",
    "Entwerfe Grammatik",
    "Arrangiere Traumgebilde",
    "Verarbeite Fantasien",
    "Schreibe Skizzen",

    "Kalibriere Humor",
    "Kontstruiere Charaktere",
    "Konzipiere Bühnenbilder",
    "Kreiere krasse Kräfte",
    "Braue Bier",

    "Sortiere Realität aus",
    "Lade Rollenbilder",
    "Verwerfe Rollenbilder",
    "Produziere Poet*innen",
    "Richte Lampen aus",

    "Lade Menschen ein",
    "Verkaufe Eintrittskarten",
    "Organisiere Getränke",
    "Stelle Stuhlreihen",
    "OK - LETZ GO"
  ];
  consoleEntries: string[] = [];


  setValue(val: number) {
    if (this.loaderValue % 5 == 0) {
      this.consoleEntries.reverse();
      this.consoleEntries.push(this.sampleEntries[this.loaderValue / 5]);
      this.consoleEntries.reverse();
    }

    this.loaderValue = val;

  }

}
