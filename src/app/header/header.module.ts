import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {HeaderComponent} from './header.component';
import {RouterModule} from '@angular/router';
import {QuicklinkModule} from 'ngx-quicklink';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    QuicklinkModule
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ]
})

export class HeaderModule {}
