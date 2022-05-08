import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, map, Observable, throwError} from "rxjs";
import {Translation} from "../model/translation.interface";

class TranslationImpl implements Translation {
    constructor(public meanings: Array<string>, public synonyms: Array<string>, public translation: string, public type?: string) {}
}

@Injectable({
    providedIn: 'root'
})
export class TranslateService {

    /** */
    apiKey: string = environment.apiKey

    getLangs(): Observable<string[]> {

        return this.httpClient
            .get(`https://dictionary.yandex.net/api/v1/dicservice.json/getLangs?key=${this.apiKey}`)
            .pipe(
                map(obj => obj as string[])
            )

    }

    handleError(error: HttpErrorResponse) {
        console.log(error)
        return throwError(error.error)
    }

    translate(from: string, to: string, what: string): Observable<Translation[]> {

        return this.httpClient.get(
            `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${this.apiKey}&lang=${from}-${to}&text=${what}`
        ).pipe(
            catchError(this.handleError),
            map((obj: any) => {
                let content = obj.def[0]
                if (!content) {
                    return [];
                }
                return content.tr.map(
                    (tr: any) => new TranslationImpl(
                        tr.mean?.map((mean: any) => mean.text) || [],
                        tr.syn?.map((synonym: any) => synonym.text) || [],
                        tr.text || "error",
                        tr.pos || "unknown"
                    )
                )
            })
        )

    }

    constructor(private httpClient: HttpClient) {}
}
