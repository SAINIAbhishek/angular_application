import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  get selectedLang(): string {
    return this._selectedLang;
  }

  private _selectedLang = 'en';

  constructor(private _translateService: TranslateService) { }

  ngOnInit(): void {
  }

  public changeLang(event: Event, lang: string) {
    event.preventDefault();
    this._selectedLang = lang;
    localStorage.setItem('lang', this._selectedLang);
    this._translateService.use(this._selectedLang);
  }

}
