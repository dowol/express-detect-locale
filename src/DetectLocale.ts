import DetectLocaleOptions from './DetectLocaleOptions';
import DetectLocaleMiddleware from './middleware';
import {fromQuery, fromCookie, fromHeader} from './LocaleDetector';

let opt : DetectLocaleOptions;
const sl = ['ar', 'de', 'en', 'es', 'fr', 'it', 'ja', 'ko', 'pt', 'ru', 'zh-cn', 'zh-tw'];
const defaultOptions : DetectLocaleOptions = {
    defaultLocale: 'en',
    supportedLocales: sl,
    fallbackToParents: true,
    priority: [fromQuery, fromCookie, fromHeader],
    fromQuery: {
        key: 'lang',
        setCookie: true
    },
    fromCookie: {
        key: 'lang',
        cookieOptions: {
            secure: true,
            expires: (function():Date{var result = new Date(); result.setFullYear(result.getFullYear() + 1); return result;})()
        }
    },
    fromHeader:{
        maxTry: sl.length,

    }
}

function DetectLocale(options? : DetectLocaleOptions){
    if(options) opt = options;
    else opt = defaultOptions;
    return DetectLocaleMiddleware;
}

export default DetectLocale;
export {opt, defaultOptions};

;