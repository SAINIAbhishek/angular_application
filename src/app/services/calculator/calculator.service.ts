import { Injectable } from '@angular/core';
import {LoggerService} from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(private readonly loggerService: LoggerService) { }

  public add(n1: number, n2: number) {
    const result = n1 + n2;
    this.loggerService.log('Add Operation is called.');
    return result;
  }

  public subtract(n1: number, n2: number) {
    const result = n1 - n2;
    this.loggerService.log('Subtract Operation is called.');
    return result;
  }

}
