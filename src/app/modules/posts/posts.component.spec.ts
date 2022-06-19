import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsComponent } from './posts.component';
import {PostInterface} from '../../models/post';
import {TestModule} from '../../tests/test.module';
import {PostService} from '../../services/post/post.service';
import {PostMock, PostsMocks} from '../../mocks/post';
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';
import {MatCardModule} from '@angular/material/card';
import {PostModule} from '../post/post.module';
import {PostComponent} from '../post/post.component';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let posts: Array<PostInterface> = [];
  let postService: PostService;
  let spy: any;

  beforeEach(async () => {
    posts = PostsMocks;
    await TestBed.configureTestingModule({
      imports: [
        TestModule,
        MatCardModule,
        PostModule
      ],
      declarations: [ PostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    postService = TestBed.inject(PostService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('delete', () => {

    beforeEach(() => {
      spy = jest.spyOn(postService, 'deletePost').mockReturnValue(of(PostMock));
      component.posts = posts;
      component.deletePost(posts[1].id);
    });

    it('should delete the selected post from the posts', () => {
      expect(component.posts.length).toBe(2);
    });

    it('should call the delete method in Post Service only once', () => {
      expect(spy).toHaveBeenCalledTimes(1);
    });

  });

  describe('test with getAllPosts()', () => {

    beforeEach(() => {
      jest.spyOn(postService, 'getAllPosts').mockReturnValue(of(PostsMocks));
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should set posts from the service directly', () => {
      expect(component.posts.length).toEqual(3);
    });

    it('should create one post child Element for each post ', () => {
      const debugElement = fixture.debugElement;
      const postsElement = debugElement.queryAll(By.css('.posts'));
      expect(postsElement.length).toEqual(PostsMocks.length);
    });

    it('should create exact same number of Post Component with Posts', () => {
      const postComponentDEs = fixture.debugElement.queryAll(
        By.directive(PostComponent)
      );
      expect(postComponentDEs.length).toEqual(PostsMocks.length);
    });
  });

});
