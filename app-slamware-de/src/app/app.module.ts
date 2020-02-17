import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { ClarityModule } from '@clr/angular';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


import { AppComponent } from './app.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import { CustomTextComponent } from './components/slides/custom-text/custom-text.component';
import { AlertComponent } from './components/admin/alert/alert.component';
import { NavigationComponent } from './components/admin/navigation/navigation.component';
import { HomeComponent } from './components/admin/home/home.component';
import { TimelineComponent } from './components/admin/timeline/timeline.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { NewProjectComponent } from './components/admin/new-project/new-project.component';
import { PreparationComponent } from './components/admin/preparation/preparation.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, PresentationComponent, CustomTextComponent, AlertComponent, NavigationComponent, HomeComponent, TimelineComponent, DashboardComponent, NewProjectComponent, PreparationComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    ClarityModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
