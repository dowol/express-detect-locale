import {DetectLocaleError} from './error';

/**
 * Regular Expression of checking the Locale code string.
 */
const re = /^[a-z]{2,3}(-[A-Z][a-z]{3})?(-[A-Z]{2})?$/i;

/**
 * Reformats the given Locale code string
 * @param {string} locale Locale code string
 * @returns {string} Reformatted Locale code string
 */
function reformat(locale: string): string{
    locale = locale.trim();
    if(!re.test(locale)){
        const e = new DetectLocaleError(`Invalid Locale Format (input: ${locale})`);
        e.input = locale
        throw e;
    }
    let s = locale.split('-');
    let result = s[0].toLowerCase();
    if(s[1]) {
        result += '-';
        if(s[1].length == 4) {
            result += s[1][0].toUpperCase() + s[1].substring(1);
            if(s[2]) result += '-' + s[2].toUpperCase();
        }
        else if(s[1].length == 2) result += s[1].toUpperCase();
    }
    return result;
}

export {re, reformat};