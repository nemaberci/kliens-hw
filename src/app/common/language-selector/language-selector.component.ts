import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css']
})
export class LanguageSelectorComponent implements OnInit {

  @Input() languages: Array<Intl.Locale> = new Array<Intl.Locale>();
  @Input() languageOptionMapper: ((lang: Intl.Locale) => string) | undefined;
  @Input() showError: boolean = false;
  @Input() selected: string | undefined;
  @Input() label: string = 'Input language';
  @Output() selectedChange = new EventEmitter<string>();

  languageNames = new Intl.DisplayNames(["en"], {type: "language"})
  regionNames = new Intl.DisplayNames(["en"], {type: "region"})

  constructor() { }

  ngOnInit(): void {}

  selectedChanged(newValue: string) {
    this.selected = newValue;
    this.selectedChange.emit(newValue);
  }

  mappedLang(lang: Intl.Locale) {
    if (this.languageOptionMapper) {
      return this.languageOptionMapper(lang)
    } else {
      return lang.baseName
    }
  }

}
