import { NgModule } from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {QuicklinkStrategy} from 'ngx-quicklink';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'preload',
    loadChildren: () => import('./preload/preload.module').then((m) => m.PreloadModule)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: QuicklinkStrategy,
    initialNavigation: 'enabled',
    scrollPositionRestoration: 'top',
    onSameUrlNavigation: 'reload',
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
