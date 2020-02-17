import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PresentationComponent } from './components/presentation/presentation.component';
import { HomeComponent } from './components/admin/home/home.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  },
  {
    path: 'presentation',
    component: PresentationComponent
  },
  {
    path: "admin",
    component: HomeComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent
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
