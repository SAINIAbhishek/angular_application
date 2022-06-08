import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TranslateModule} from '@ngx-translate/core';
import {CardDetailsComponent} from './card-details.component';
import {MatCardModule} from '@angular/material/card';
import {CardDetailsRoutingModule} from './card-details-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    MatCardModule,
    CardDetailsRoutingModule
  ],
  declarations: [
    CardDetailsComponent
  ]
})

export class CardDetailsModule {}
