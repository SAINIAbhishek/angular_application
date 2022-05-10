import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {PreloadRoutingModule} from './preload-routing.module';
import {PreloadComponent} from './preload.component';

@NgModule({
  imports: [
    CommonModule,
    PreloadRoutingModule
  ],
  declarations: [
    PreloadComponent
  ],
  exports: [
    PreloadComponent
  ]
})

export class PreloadModule {}
