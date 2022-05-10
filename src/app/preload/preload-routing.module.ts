import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {PreloadComponent} from './preload.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: PreloadComponent,
        pathMatch: 'full'
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})

export class PreloadRoutingModule {}
