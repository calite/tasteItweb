import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  searchType: string = 'name';
  searchTerm: string = '';


  onSubmit() {
    // Lógica para buscar usando el tipo de búsqueda y término de búsqueda
  }

}
