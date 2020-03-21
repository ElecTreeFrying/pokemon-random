import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, flatMap } from 'rxjs/operators'
import * as Chance from 'chance';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private path: string = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) {}

  get randomPokemon() {

    return this.http.get(this.path + '?offset=0&limit=964').pipe(
      flatMap((res) => {

        const ids = [];
        res['results'].forEach((result: any) => {
          const id = result['url'].split('/').reverse()[1];
          ids.push(id);
        });
        
        const chance = new Chance();
        const randInt = chance.integer({ min: 0, max: ids.length - 1 });
        const path = this.path + ids[randInt];
        
        return this.http.get(path);
      }),
      map((e) => {
        delete e['game_indices'];   delete e['moves'];      delete e['order'];
        delete e['held_items'];     delete e['id'];         delete e['stats'];
        delete e['abilities'];

        e['name'] = e['name'].split('-').join(' ');

        return e;
      }),
    );
  }
 
}
