import {Injectable} from '@angular/core';
import {Synonym} from "../model/synonym.interface";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

class SynonymImpl implements Synonym {
    constructor(public category: string, public words: string[]) {
    }
}

@Injectable({
    providedIn: 'root'
})
export class ThesaurusService {

    apiKey: string = environment.thesaurusApiKey

    thesaurize(lang: string, word: string): Observable<Synonym[]> {
        return this.httpClient
            .get(`http://thesaurus.altervista.org/thesaurus/v1?word=${word}&language=${lang}&key=${this.apiKey}&output=json`)
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
