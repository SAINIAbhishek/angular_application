import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add two number', () => {
    const result = service.add(2, 4);
    expect(result).toBe(6);
  });

  it('should subtract two number', () => {
    const result = service.subtract(4, 2);
    expect(result).toBe(2);
  });
});
