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
import { AdminGroupsComponent } from './components/admin-groups/admin-groups.component';
import { AdminSettingsComponent } from './components/admin-settings/admin-settings.component';
import { AdminPresentationComponent } from './components/admin-presentation/admin-presentation.component';
import { ProjectionPoetComponent } from './components/projection-poet/projection-poet.component';
import { NgxElectronModule } from 'ngx-electron';
import { UiProgressRingComponent } from './components/ui-progress-ring/ui-progress-ring.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { AdminAssetsComponent } from './components/admin-assets/admin-assets.component';
import { ProjectionBlankComponent } from './components/projection-blank/projection-blank.component';
import { ProjectionAssetComponent } from './components/projection-asset/projection-asset.component';
import { AdminProjectionEditorComponent } from './components/admin-projection-editor/admin-projection-editor.component';
import { ProjectionEventNameAnnouncementComponent } from './components/projection-event-name-announcement/projection-event-name-announcement.component';
import { GenericDataService } from './services/generic-data.service';
import { Group } from './models/group';
import { DataService } from './services/data.service';
import { ProjectionGroupAnnouncementComponent } from './components/projection-group-announcement/projection-group-announcement.component';
import { ProjectionGroupScoresComponent } from './components/projection-group-scores/projection-group-scores.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AdminDashboardComponent,
    ProjectionComponent,
    AdminPoetsComponent,
    AdminContestComponent,
    AdminGroupsComponent,
    AdminSettingsComponent,
    AdminPresentationComponent,
    ProjectionPoetComponent,
    UiProgressRingComponent,
    SplashScreenComponent,
    AdminAssetsComponent,
    ProjectionBlankComponent,
    ProjectionAssetComponent,
    AdminProjectionEditorComponent,
    ProjectionEventNameAnnouncementComponent,
    ProjectionGroupAnnouncementComponent,
    ProjectionGroupScoresComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ClarityModule,
    FormsModule,
    NgxElectronModule
  ],
  providers: [
    { provide: 'GroupService', useFactory: (ds: DataService) => { let gds = new GenericDataService<Group>(ds); gds.Init('groups'); return gds; } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  
  constructor(
    private iconService: IconService
  ) { 
    this.iconService.RegisterIcons();
  }
  
}
