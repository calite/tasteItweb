import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public defaultLang = localStorage.getItem('language');

  title = 'tasteIt';

  constructor(public translate: TranslateService) {

    if( this.defaultLang == null) {
      localStorage.setItem('language',window.navigator.language); //multilenguage
    }
    translate.addLangs(environment.languages);
    translate.setDefaultLang(localStorage.getItem('language'));
    translate.use(localStorage.getItem('language').match(/en-GB|es-ES/) ? localStorage.getItem('language') : 'en-GB');
    // const browserLang = translate.getBrowserLang();
  }

  changeLanguage(language : string) {
    language === this.translate.currentLang
    localStorage.setItem('language', language); //multilenguage
    this.translate.use(language)
  }

}
