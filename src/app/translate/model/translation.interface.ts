/**
 * Interface describing a translation.
 * */
export interface Translation {
    /**
     * Additional context for the meaning
     * @type string[]
     * */
    meanings: Array<string>,
    /**
     * The word's translation
     * @type string
     * */
    translation: string,
    /**
     * Synonyms for this translation
     * @type string[]
     * */
    synonyms: Array<string>,
    /**
     * The type of the word (part of speech)
     * @type string
     * */
    type?: string
}