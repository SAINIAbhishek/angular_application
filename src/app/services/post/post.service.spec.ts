import { TestBed } from '@angular/core/testing';

import { PostService } from './post.service';
import {TestModule} from '../../tests/test.module';

describe('PostService', () => {
  let service: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule]
    });
    service = TestBed.inject(PostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
