import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {PreloadRoutingModule} from './preload-routing.module';
import {PreloadComponent} from './preload.component';
import {TranslateModule} from '@ngx-translate/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    PreloadRoutingModule,
    TranslateModule.forChild(),
    MatCardModule,
    MatButtonModule
  ],
  declarations: [
    PreloadComponent
  ],
  exports: [
    PreloadComponent
  ]
})

export class PreloadModule {}
