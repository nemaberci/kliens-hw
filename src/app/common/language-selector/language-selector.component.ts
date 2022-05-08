import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css']
})
export class LanguageSelectorComponent implements OnInit {

  /**
   * Languages to display
   * @type Intl.Locale[]
   * */
  @Input() languages: Array<Intl.Locale> = new Array<Intl.Locale>();
  /**
   * Locale to option value mapper
   * @type function
   * */
  @Input() languageOptionMapper: ((lang: Intl.Locale) => string) | undefined;
  /**
   * Show error
   * @type boolean
   * */
  @Input() showError: boolean = false;
  /**
   * Selected value
   * @type string | undefined
   * */
  @Input() selected: string | undefined;
  /**
   * Select label
   * @type string
   * */
  @Input() label: string = 'Input language';
  /**
   * Selected value changed
   * */
  @Output() selectedChange = new EventEmitter<string>();

  /**
   * Internal variable used in template when rendering
   * */
  languageNames = new Intl.DisplayNames(["en"], {type: "language"})
  /**
   * Internal variable used in template when rendering
   * */
  regionNames = new Intl.DisplayNames(["en"], {type: "region"})

  constructor() { }

  ngOnInit(): void {}

  /**
   * Internal function handling internal select input event
   * */
  selectedChanged(newValue: string) {
    this.selected = newValue;
    this.selectedChange.emit(newValue);
  }

  /**
   * Internal function handling language mapper or lack-thereof
   * */
  mappedLang(lang: Intl.Locale) {
    if (this.languageOptionMapper) {
      return this.languageOptionMapper(lang)
    } else {
      return lang.baseName
    }
  }

}
