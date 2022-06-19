import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import {TestModule} from '../../tests/test.module';
import {MatButtonModule} from '@angular/material/button';
import {PostMock} from '../../mocks/post';
import {first} from 'rxjs/operators';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestModule,
        MatButtonModule,
        RouterTestingModule
      ],
      declarations: [ PostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should raise an event when the delete post is clicked', () => {
    component.post = PostMock;
    component.delete.pipe(first()).subscribe((postId) => {
      expect(postId).toBe(PostMock.id);
    });
    component.onDeletePost(new MouseEvent('click'));
  });

  it('should render the post title in the anchor element', () => {
    component.post = PostMock;
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    const a = element.querySelector('a');
    expect(a?.textContent).toContain(PostMock.title);
  });

  it('should render the post title in the anchor element using debug', () => {
    component.post = PostMock;
    fixture.detectChanges();
    const element = fixture.debugElement;
    const a: HTMLElement = element.query(By.css('a')).nativeElement;
    expect(a?.textContent).toContain(PostMock.title);
  });
});
