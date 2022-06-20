import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  get selectedLang(): string {
    return this._selectedLang;
  }

  private _selectedLang = this._translateService.currentLang || 'en';

  constructor(@Inject(PLATFORM_ID) protected platformId: object,
              private _translateService: TranslateService) { }

  ngOnInit(): void {
  }

  public changeLang(event: Event, lang: string) {
    event.preventDefault();

    if (isPlatformBrowser(this.platformId)) {
      this._selectedLang = lang;
      localStorage.setItem('lang', this._selectedLang);
      this._translateService.use(this._selectedLang);
    }
  }

}
