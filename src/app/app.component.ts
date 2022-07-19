import { AfterViewInit, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'slamware-app';

  showSplashScreen = false;
  loaderValue = 0;

  constructor(
    private configService: ConfigService,
    private router: Router
  ) { }

  ngOnInit() {

    this.router.events.subscribe((event: any) => {

      if (event instanceof NavigationEnd) {
        if (event.url != "/projection") {
          if (this.configService._config == undefined) {
            console.log("config is undefined");
            this.router.navigate(['/admin/settings'])
          }
        }
      }


    });


    let interval = setInterval(() => {
      this.loaderValue += 1

      if (this.loaderValue > 100) {
        this.showSplashScreen = false;
        clearInterval(interval);
      }

    }, 50);
  }


}
