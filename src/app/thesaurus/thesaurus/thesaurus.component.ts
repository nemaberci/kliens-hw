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
  /**
   * Internal variable for input text form control (making it required)
   * */
  inputTextFormControl: FormControl = new FormControl('', Validators.required);
  /**
   * Internal variable for input text
   * */
  inputText: string = "";
  /**
   * Internal variable for error handling
   * */
  showError: boolean = false;
  /**
   * Internal variable for input language
   * */
  inputLanguage: string = "";
  /**
   * Internal variable for supported source languages. Thesaurus does not support language query, so this is
   * not temporary.
   * */
  sourceLanguages: string[] = [
    'cs_CZ', 'da_DK', 'de_CH', 'de_DE', 'en_US', 'el_GR', 'es_ES', 'fr_FR', 'hu_HU', 'it_IT', 'no_NO', 'pl_PL', 'pt_PT', 'ro_RO', 'ru_RU', 'sk_SK'
  ];
  /**
   * Internal variable source languages converted to Locale-s
   * */
  locales = this.sourceLanguages.map(
      lang => new Intl.Locale(lang.replace('_', '-'))
  )
  /**
   * Internal variable storing recieved synonyms.
   * */
  synonyms: Synonym[] = [];

  /**
   * Locale to backend-supported language code mapper
   * @param {Intl.Locale} lang Language
   * @returns {string} The value to send
   * */
  languageOptionMapper(lang: Intl.Locale): string {
    return lang.baseName?.replace('-','_') || ""
  }

  constructor(private thesaurusService: ThesaurusService) { }

  ngOnInit(): void {
  }

  /**
   * Run the synonym finder.
   * */
  thesaurize() {
    this.thesaurusService.thesaurize(this.inputLanguage, this.inputText)
        .subscribe(
            value => {
              this.synonyms = value
              this.showError = false;
            },
            error => {
              this.synonyms = [];
              this.showError = true;
            }
        )
  }
}
