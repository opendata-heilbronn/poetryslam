import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'slamware-app';

  showSplashScreen = true;
  loaderValue = 0;

  ngOnInit() {
    let interval = setInterval(() => {
      this.loaderValue += 1

      if (this.loaderValue > 100) {
        this.showSplashScreen = false;
        clearInterval(interval);
      }

    }, 50);
  }
  

}
