import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {PreloadRoutingModule} from './preload-routing.module';
import {PreloadComponent} from './preload.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    PreloadRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [
    PreloadComponent
  ],
  exports: [
    PreloadComponent
  ]
})

export class PreloadModule {}
