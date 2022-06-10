import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not have any messages at starting', () => {
    expect(service.messages.length).toBe(0);
  });

  it('should add a message when log() is called', () => {
    service.log('this is a new message');
    expect(service.messages.length).toBe(1);
  });

  it('should clear all the messages when clear() is called', () => {
    service.log('this is a new message');
    service.clear();
    expect(service.messages.length).toBe(0);
  });
});
