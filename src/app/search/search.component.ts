import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(public http: HttpClient) {
    this.http = http;
  }

  ngOnInit(): void { }

  url: string = "https://www.anapioficeandfire.com/api/characters?";

  searchTypes: string[] = ["name", "gender", "culture"];

  characterSearch: string = "";

  character: Character | undefined;

  state = -1;

  setState(i: number) {
    this.state = i;
  }

  safeString(s: string) {
    return (s ? s : "Unknown");
  }
  
  bioInfo: string[] = [
    "Name",
    "Born",
    "Died",
    "Culture",
    "Gender",
    "Father",
    "Mother",
    "Spouse"
  ]

  infoDisplays: Info[] = [{
      type: "Biographical Info",
      display: c => this.bioInfo.map(s => s + ": " + this.safeString(eval("c." + s.toLowerCase())))
    }, {
      type: "List of Titles",
      display: c => (c.name ? [c.name] : []).concat(c.titles).concat(c.aliases)
    }, {
      type: "Books and TV Seasons",
      display: c => c.books.concat(c.povBooks).concat(c.tvSeries)
    }
  ]

  search(i: number): void {
    this.http.get(this.url + this.searchTypes[i] + "=" + this.characterSearch).subscribe(
      response => {
        this.state = -1;
        let characters: any = response;
        this.character = characters[Math.floor(Math.random() * characters.length)];
      }
    );
  }
}

interface Character {
  name: string;
  born: string;
  died: string;
  culture: string;
  gender: string;
  father: string;
  mother: string;
  spouse: string;
  titles: string[];
  aliases: string[];
  books: string[];
  povBooks: string[];
  tvSeries: string[];
}

interface Info {
  type: string;
  display: (c: Character) => string[];
}