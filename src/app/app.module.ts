import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import {Inject, NgModule, PLATFORM_ID} from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {HeaderModule} from './modules/header/header.module';
import {QuicklinkModule} from 'ngx-quicklink';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
// import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';
import {TranslateResources} from './translate-resources';
import {StrengthPipe} from './pipes/strength/strength.pipe';
import {ToastrModule} from 'ngx-toastr';
import {ApiUrlInterceptor} from './interceptors/api-url.interceptor';
import {isPlatformBrowser} from '@angular/common';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  // return new TranslateHttpLoader(http);
  return new MultiTranslateHttpLoader(http, TranslateResources);
}

@NgModule({
  declarations: [
    AppComponent,
    StrengthPipe
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'angular-app'}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot({
      progressAnimation: 'increasing',
      progressBar: true
    }),
    BrowserTransferStateModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule,
    HeaderModule,
    QuicklinkModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(@Inject(PLATFORM_ID) protected platformId: object,
              private _translateService: TranslateService) {

    let lang = 'en';

    if (isPlatformBrowser(this.platformId)) {
      lang = localStorage.getItem('lang') || 'en';
    }

    this._translateService.addLangs(['en', 'fr']);
    this._translateService.setDefaultLang('en');
    this._translateService.use(lang);
  }

}
