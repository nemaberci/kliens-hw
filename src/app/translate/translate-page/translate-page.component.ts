import {Component, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from "../service/translate.service";
import {Translation} from "../model/translation.interface";
import {AbstractControl, FormControl, FormGroupDirective, NgForm, ValidatorFn, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";

class CustomErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean {
        console.log(control, form);
        return true;
    }
}

@Component({
    selector: 'app-translate-page',
    templateUrl: './translate-page.component.html',
    styleUrls: ['./translate-page.component.css']
})
export class TranslatePageComponent implements OnInit {

    /**
     * Translation source languages
     * */
    sourceLanguages: Intl.Locale[] = []
    /**
     * Translation target languages (per source language)
     * */
    targetLanguages: Map<string, Intl.Locale[]> = new Map()
    /**
     * Currently selected input language
     * */
    inputLanguage: string = ""
    /**
     * Currently selected output language
     * */
    outputLanguage: string = ""
    /**
     * Currently added translation input
     * */
    toTranslate: string = ""
    /**
     * Received translations
     * */
    translations: Array<Translation> = []
    /**
     * Form control for input text
     * */
    inputTextFormControl: FormControl = new FormControl('', [Validators.minLength(1), Validators.required]);
    /**
     * Error flag for no translation exists
     * */
    noResponse: boolean = false;
    /**
     * Custom error message in case the error is not 'noResponse'
     * */
    customError: string = "";
    /**
     * Show error messages or not. Gets reset every time the input updates
     * */
    showError: boolean = false;

    constructor(private translateService: TranslateService) {
    }

    /**
     * Fetch available languages (from the api) and store them asynchronously
     * */
    subscribeToLanguages() {
        this.translateService.getLangs().subscribe(
            langs => {
                langs.forEach(
                    lang => {
                        let parts = lang.split("-")
                        if (!this.sourceLanguages.find(loc => loc.baseName === parts[0])) {
                            this.sourceLanguages.push(new Intl.Locale(parts[0]))
                        }
                        if (this.targetLanguages.has(parts[0])) {
                            this.targetLanguages.set(
                                parts[0],
                                this.targetLanguages.get(parts[0])!.concat(new Intl.Locale(parts[1]))
                            )
                        } else {
                            this.targetLanguages.set(parts[0], [new Intl.Locale(parts[1])])
                        }
                    }
                )
                console.log(this.sourceLanguages, this.targetLanguages)
            }
        )
    }

    /**
     * Get translation(s) from the api and store them
     * */
    async translate() {
        if (!this.inputLanguage || !this.outputLanguage || !this.toTranslate) {
            this.showError = true;
            return;
        }
        this.translateService.translate(
            this.inputLanguage,
            this.outputLanguage,
            this.toTranslate
        ).subscribe(
            translation => {
                console.log(translation)
                if (translation.length === 0) {
                    this.noResponse = true;
                    this.customError = "";
                    this.showError = true
                    return;
                }
                this.translations = translation
                this.noResponse = false;
                this.customError = "";
                this.showError = false;
            },
            error => {
                console.log(error)
                this.noResponse = false;
                this.showError = true;
                this.customError = error.message || 'Network error';
            }
        )
    }


    ngOnInit(): void {
        this.subscribeToLanguages()
    }
}
