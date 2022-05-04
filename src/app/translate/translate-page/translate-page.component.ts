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

    sourceLanguages: Set<string> = new Set<string>()
    targetLanguages: Map<string, Set<string>> = new Map()
    inputLanguage: string = ""
    outputLanguage: string = ""
    toTranslate: string = ""
    translated: string = ""
    languageNames = new Intl.DisplayNames(["en"], {type: "language"})
    translations: Array<Translation> = []
    inputTextFormControl: FormControl = new FormControl('', [Validators.minLength(1), Validators.required]);
    JSON = JSON;
    selectErrorStateMatcher: any = new CustomErrorStateMatcher();
    triedOnce: boolean = false;
    noResponse: boolean = false;
    customError: string = "";

    constructor(private translateService: TranslateService) {
    }

    subscribeToLanguages() {
        this.translateService.getLangs().subscribe(
            langs => {
                langs.forEach(
                    lang => {
                        let parts = lang.split("-")
                        this.sourceLanguages.add(parts[0])
                        if (this.targetLanguages.has(parts[0])) {
                            this.targetLanguages.set(
                                parts[0],
                                this.targetLanguages.get(parts[0])!.add(parts[1])
                            )
                        } else {
                            this.targetLanguages.set(parts[0], new Set<string>().add(parts[1]))
                        }
                    }
                )
            }
        )
    }

    async translate() {
        this.triedOnce = true;
        if (!this.inputLanguage || !this.outputLanguage || !this.toTranslate) {
            // return;
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
                    return;
                }
                this.translations = translation
                this.translated = translation[0].translation
                this.noResponse = false;
                this.customError = "";
            },
            error => {
                console.log(error)
                this.noResponse = false;
                this.customError = error.message;
            }
        )
    }


    ngOnInit(): void {
        this.subscribeToLanguages()
    }
}
