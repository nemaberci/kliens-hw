import {Injectable} from '@angular/core';
import {Synonym} from "../model/synonym.interface";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

/**
 * Internal Synonym implementation without any added functionality.
 * */
class SynonymImpl implements Synonym {
    constructor(public category: string, public words: string[]) {
    }
}

@Injectable({
    providedIn: 'root'
})
export class ThesaurusService {

    /**
     * Internal variable, using thesaurusApiKey environmental variable.
     * */
    apiKey: string = environment.thesaurusApiKey

    /**
     * Find Synonym for <code>word</code> in language <code>lang</code>.
     * @returns Observable<Synonym[]>
     *     @param lang {string} Input word's language
     *     @param word {string} Input word
     * */
    thesaurize(lang: string, word: string): Observable<Synonym[]> {
        return this.httpClient
            .get(`http://thesaurus.altervista.org/thesaurus/v1?language=${lang}&key=${this.apiKey}&output=json&word=${word}`)
            .pipe(
                map(
                    (synonyms: any) => {
                        let toReturn: Synonym[] = [];
                        for (let synonym of synonyms.response) {
                            toReturn.push(
                                new SynonymImpl(
                                    synonym.list?.category,
                                    (synonym.list?.synonyms as string).split('|').filter(s => s.length > 0)
                                )
                            )
                        }
                        return toReturn;
                    }
                )
            )
    }

    constructor(private httpClient: HttpClient) {
    }
}
