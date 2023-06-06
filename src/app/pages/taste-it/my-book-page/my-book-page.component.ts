import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-my-book-page',
  templateUrl: './my-book-page.component.html',
  styleUrls: ['./my-book-page.component.scss']
})
export class MyBookPageComponent {

  constructor(public translate: TranslateService) {
    this.translate.use(localStorage.getItem('language'))
  }

}
