import { Component, OnInit } from "@angular/core";
import { ApiService } from "./api.service";

@Component({
  selector: "Home",
  templateUrl: "./home.component.html",
  styleUrls: [ "./home.component.scss" ]
})
export class HomeComponent implements OnInit {

  pokemon: any;

  constructor(private api: ApiService) {}

  ngOnInit() {
  }
  
  search() {
    this.api.randomPokemon.subscribe((res) => {
      this.pokemon = res;
    });
  }

}
