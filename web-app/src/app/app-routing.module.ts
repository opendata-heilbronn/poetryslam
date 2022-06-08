import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPoetComponent } from './components/admin-poet/admin-poet.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { AdminPoetsComponent } from './components/admin-poets/admin-poets.component';
import { ProjectionComponent } from './components/projection/projection.component';
import { AdminContestComponent } from './components/admin-contest/admin-contest.component';

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
        path: "contest",
        component: AdminContestComponent
      },
      {
        path: "poets",
        component: AdminPoetsComponent,

        children: [
          {
            path: ":id",
            component: AdminPoetComponent
          }
        ]
      }
    ]
  },

  {
    path: "**",
    redirectTo: "/projection",
    pathMatch: "full"
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
