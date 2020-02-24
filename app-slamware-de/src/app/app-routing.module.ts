import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/admin/home/home.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { PreparationComponent } from './components/admin/preparation/preparation.component';
import { ProjectorComponent } from './components/projector/projector.component';
import { PresentationComponent } from './components/admin/presentation/presentation.component';
import { EditorCompetitionComponent } from './components/admin/editor-competition/editor-competition.component';
import { EditorPoetsComponent } from './components/admin/editor-poets/editor-poets.component';
import { EditorGroupsComponent } from './components/admin/editor-groups/editor-groups.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  },
  {
    path: 'projector',
    component: ProjectorComponent
  },
  {
    path: "admin",
    component: HomeComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent
      },
      {
        path: "competition",
        component: EditorCompetitionComponent
      },
      {
        path: "poets",
        component: EditorPoetsComponent
      },
      {
        path: "groups",
        component: EditorGroupsComponent
      },
      {
        path: "preparation",
        component: PreparationComponent
      },
      {
        path: "presentation",
        component: PresentationComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: "admin"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
