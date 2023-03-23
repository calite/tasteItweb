import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe, RecipesResponse } from './recipe.interface';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {


    private servicioUrl: string = 'https://apitasteit.azurewebsites.net';

    //private _historial: string[] = [];

    public resultados: Recipe[] = [];

    public hola : any;

    /*
    get historial() {
        return [...this._historial];
    }
    */
    constructor(private http: HttpClient) {
        //cargamos datos locales si existen.
        //this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

    }

    async getRecipesHome() {

        //this._historial = this._historial.splice(0, 10); //recorta el array principal, coge 10 primeros

        //localStorage.setItem('historial', JSON.stringify(this._historial)); //almacenamiento en local

        //const params = new HttpParams() //just in case
        //this.http.get<RecipesResponse>(`${this.servicioUrl}/recipe`, { params })
        
        this.http.get<RecipesResponse>('https://apitasteit.azurewebsites.net/recipes')
            .subscribe((resp) => {
                debugger;
                console.log(resp);
                this.hola = resp;
                //localStorage.setItem('resultados', JSON.stringify(this.resultados));
            });
        
        /*
        const resp = await fetch('https://apitasteit.azurewebsites.net/recipes');
        const data = await resp.json();

        this.resultados = data;
        */
    }

}
