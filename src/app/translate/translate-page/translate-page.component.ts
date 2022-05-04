import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-translate-page',
  templateUrl: './translate-page.component.html',
  styleUrls: ['./translate-page.component.css']
})
export class TranslatePageComponent implements OnInit {

  languages: Array<{code: string, display: string}> = []
  inputLanguage: string = ""
  outputLanguage: string = ""
  toTranslate: string = ""
  translated: string = ""

  constructor() { }

  ngOnInit(): void {
  }

}
