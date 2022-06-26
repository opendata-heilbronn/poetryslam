import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { AdminPoetsComponent } from './components/admin-poets/admin-poets.component';
import { ProjectionComponent } from './components/projection/projection.component';
import { AdminContestComponent } from './components/admin-contest/admin-contest.component';
import { AdminRoundsComponent } from './components/admin-rounds/admin-rounds.component';
import { AdminGroupsComponent } from './components/admin-groups/admin-groups.component';
import { AdminSettingsComponent } from './components/admin-settings/admin-settings.component';
import { AdminPresentationComponent } from './components/admin-presentation/admin-presentation.component';

const routes: Routes = [
  {
    path: "projection",
    component: ProjectionComponent
  },

  {
    path: "admin",
    component: AdminLayoutComponent,

    children: [
      {
        path: "dashboard",
        component: AdminDashboardComponent
      },
      {
        path: "settings",
        component: AdminSettingsComponent
      },
      {
        path: "contest",
        component: AdminContestComponent
      },
      {
        path: "poets",
        component: AdminPoetsComponent,
      },
      {
        path: "rounds",
        component: AdminRoundsComponent,
      }, {
        path: "groups",
        component: AdminGroupsComponent,
      },
      {
        path: "presentation",
        component: AdminPresentationComponent
      }
    ]
  },

  {
    path: "**",
    redirectTo: "/admin/dashboard",
    pathMatch: "full"
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
