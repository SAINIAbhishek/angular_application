import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {CardDetailsComponent} from './card-details.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: CardDetailsComponent
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})

export class CardDetailsRoutingModule {}
