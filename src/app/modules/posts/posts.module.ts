import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {PostsComponent} from './posts.component';
import {RouterModule} from '@angular/router';
import {PostModule} from '../post/post.module';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: '', component: PostsComponent}
    ]),
    CommonModule,
    PostModule,
    MatCardModule
  ],
  declarations: [
    PostsComponent
  ]
})

export class PostsModule {}
