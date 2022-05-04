import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Synonym} from "../model/synonym.interface";
import {ThesaurusService} from "../service/thesaurus.service";

@Component({
  selector: 'app-thesaurus',
  templateUrl: './thesaurus.component.html',
  styleUrls: ['./thesaurus.component.css']
})
export class ThesaurusComponent implements OnInit {
  inputTextFormControl: FormControl = new FormControl('', Validators.required);
  inputText: string = "";
  notFound: boolean = false;
  inputLanguage: string = "";
  sourceLanguages: string[] = [
    'cs_CZ', 'da_DK', 'de_CH', 'de_DE', 'en_US', 'el_GR', 'es_ES', 'fr_FR', 'hu_HU', 'it_IT', 'no_NO', 'pl_PL', 'pt_PT', 'ro_RO', 'ru_RU', 'sk_SK'
  ];
  locales = this.sourceLanguages.map(
      lang => new Intl.Locale(lang.replace('_', '-'))
  )
  languageNames = new Intl.DisplayNames(["en"], {type: "language"})
  regionNames = new Intl.DisplayNames(["en"], {type: "region"})
  triedOnce: boolean = false;
  synonyms: Synonym[] = [];

  constructor(private thesaurusService: ThesaurusService) { }

  ngOnInit(): void {
  }

  thesaurize() {
    console.log("Thesaurizing: " + this.inputText)
    this.triedOnce = true;
    this.thesaurusService.thesaurize(this.inputLanguage, this.inputText)
        .subscribe(
            value => {
              this.synonyms = value
              this.notFound = false;
            },
            error => {
              this.notFound = true;
            }
        )
  }
}
