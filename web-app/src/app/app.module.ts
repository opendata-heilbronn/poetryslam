import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ProjectionComponent } from './components/projection/projection.component';
import { AdminPoetsComponent } from './components/admin-poets/admin-poets.component';
import { IconService } from './services/icon.service';
import { FormsModule } from '@angular/forms';
import { AdminContestComponent } from './components/admin-contest/admin-contest.component';
import { AdminRoundsComponent } from './components/admin-rounds/admin-rounds.component';
import { AdminGroupsComponent } from './components/admin-groups/admin-groups.component';
import { AdminSettingsComponent } from './components/admin-settings/admin-settings.component';
import { AdminPresentationComponent } from './components/admin-presentation/admin-presentation.component';
import { ProjectionPoetComponent } from './components/projection-poet/projection-poet.component';
import { NgxElectronModule } from 'ngx-electron';
import { UiProgressRingComponent } from './components/ui-progress-ring/ui-progress-ring.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AdminDashboardComponent,
    ProjectionComponent,
    AdminPoetsComponent,
    AdminContestComponent,
    AdminRoundsComponent,
    AdminGroupsComponent,
    AdminSettingsComponent,
    AdminPresentationComponent,
    ProjectionPoetComponent,
    UiProgressRingComponent,
    SplashScreenComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ClarityModule,
    FormsModule,
    NgxElectronModule
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
