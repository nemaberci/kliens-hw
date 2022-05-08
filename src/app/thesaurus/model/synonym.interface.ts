/**
 * Describes a Synonym of a word by listing the synonym's category (eg. verb, noun or '-' if missing) and the words
 * that belong to this category.
 * */
export interface Synonym {
    /**
     * The synonym words
     * @type string[]
     * */
    words: string[];
    /**
     * The synonym category
     * @type string
     * */
    category: string;
}