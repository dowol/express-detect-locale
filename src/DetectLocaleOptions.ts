import {Request, Response, CookieOptions} from 'express';
import {LocaleDetector} from './LocaleDetector';

interface DetectLocaleOptions{
    defaultLocale?: string;
    supportedLocales?: string | string[];
    fallbackToParents?: boolean;
    priority?: LocaleDetector[];
    fromQuery?: DetectFromQueryOptions;
    fromCookie?: DetectFromCookieOptions;
    fromHeader?: DetectFromHeaderOptions;
    chooseByUser?: ChooseByUserOptions;
}

interface DetectFromQueryOptions{
    key?: string;
    setCookie?: boolean;
}

interface DetectFromCookieOptions{
    key?: string;
    cookieOptions?: CookieOptions;
}

interface DetectFromHeaderOptions{
    maxTry?: number;
    setCookie?: boolean;
}

interface ChooseByUserOptions{
    enable?: boolean;
    redirection?: string;
}


export default DetectLocaleOptions;
export {DetectLocaleOptions, DetectFromQueryOptions, DetectFromCookieOptions, ChooseByUserOptions, DetectFromHeaderOptions};