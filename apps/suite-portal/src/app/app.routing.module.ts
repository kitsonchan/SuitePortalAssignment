import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminLoginModule } from './admin-login/admin-login.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminHomeModule } from './admin-home/admin-home.module';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'admin/login',
    component: AdminLoginComponent
  },
  {
    path: 'admin/home',
    component: AdminHomeComponent
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [
    HomeModule,
    AdminLoginModule,
    AdminHomeModule,
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      enableTracing: true,
      relativeLinkResolution: 'corrected',
    }),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {}
