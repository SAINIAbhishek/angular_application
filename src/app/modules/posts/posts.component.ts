import { Component, OnInit } from '@angular/core';
import {PostInterface} from '../../models/post';
import {PostService} from '../../services/post/post.service';
import {first} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: Array<PostInterface> = [];

  constructor(private postService: PostService,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllPosts();
  }

  private getAllPosts() {
    this.postService.getAllPosts().pipe(first()).subscribe((res) => {
      this.posts = res;
    }, (err: HttpErrorResponse) => {
      this.toastrService.error(err.message, 'Error');
      console.error(err);
    });
  }

  public deletePost(id: number) {
    this.postService.deletePost(id).pipe(first()).subscribe(() => {
      this.toastrService.success('The post has been deleted.', 'Success');
      this.posts = this.posts.filter((post) => post.id !== id);
    }, (err: HttpErrorResponse) => {
      this.toastrService.error(err.message, 'Error');
      console.error(err);
    });
  }

}
