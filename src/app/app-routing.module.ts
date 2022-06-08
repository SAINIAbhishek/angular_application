import { NgModule } from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {QuicklinkStrategy} from 'ngx-quicklink';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'preload',
    loadChildren: () => import('./modules/preload/preload.module').then((m) => m.PreloadModule)
  },
  {
    path: 'card',
    loadChildren: () => import('./modules/card-details/card-details.module').then((m) => m.CardDetailsModule),
    outlet: 'selected'
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
