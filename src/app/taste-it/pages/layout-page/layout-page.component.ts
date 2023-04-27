import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.scss']
})
export class LayoutPageComponent {

  public menuItems = [
    {label: 'home', icon: 'home', url:'.'},
    {label: 'search', icon: 'search', url:'./search'},
    {label: 'random', icon: 'shuffle', url:'./random'},
    {label: 'my book', icon: 'menu_book', url:'./my-book'},
  ]

}
