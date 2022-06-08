import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloadComponent } from './preload.component';
import {TestModule} from '../../tests/test.module';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

describe('PreloadComponent', () => {
  let component: PreloadComponent;
  let fixture: ComponentFixture<PreloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreloadComponent ],
      imports: [
        TestModule,
        MatCardModule,
        MatButtonModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
