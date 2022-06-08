import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ProjectionComponent } from './components/projection/projection.component';
import { AdminPoetsComponent } from './components/admin-poets/admin-poets.component';
import { IconService } from './services/icon.service';
import { AdminPoetComponent } from './components/admin-poet/admin-poet.component';
import { FormsModule } from '@angular/forms';
import { AdminContestComponent } from './components/admin-contest/admin-contest.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AdminDashboardComponent,
    ProjectionComponent,
    AdminPoetsComponent,
    AdminPoetComponent,
    AdminContestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private iconService: IconService
  ) { 
    this.iconService.RegisterIcons();
  }
}
