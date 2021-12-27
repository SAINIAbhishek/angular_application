import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, isPlatformServer} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) protected platformId: object) {
  }

  public ngOnInit(): void {
    console.log('Is browser');
    console.log(isPlatformBrowser(this.platformId));
    console.log('Is server');
    console.log(isPlatformServer(this.platformId));
  }

}
