import {CookieOptions} from 'express';
import {LocaleDetector} from './detector';

/**
 *
 */
interface DetectLocaleMiddlewareOptions {
    /**
     *
     */
    default?: string;
    /**
     *
     */
    supported?: string | string[];
    /**
     *
     */
    priority?: LocaleDetector[];
    /**
     *
     */
    fallbackParent?: boolean;
    /**
     *
     */
    setCookie?: boolean;
    /**
     *
     */
    setHeader?: boolean;
    /**
     *
     */
    fromQuery?: {
        /**
         *
         */
        key?: string;
    };
    /**
     *
     */
    fromCookie?: {
        /**
         *
         */
        key?: string;
        /**
         *
         */
        options?: CookieOptions;
    };
    /**
     *
     */
    fromHeader?: {
        /**
         *
         */
        maxTry?: number;
    };
    /**
     *
     */
    fromUser?: {
        /**
         *
         */
        path?: string;
    }
}

const defaultOptions: DetectLocaleMiddlewareOptions = {
    default: 'en',
    supported: ['en', 'ko', 'ja', 'fr'],
    fallbackParent: true,
    setCookie: true,
    setHeader: true,
    fromQuery:{
        key: 'lang'
    },
    fromCookie: {
        key: 'lang',
        options: {
            secure: true,
            path: '/',
            expires: (()=>{let d = new Date(); d.setMonth(6); return d;})(),
            sameSite: 'strict'
        }
    },
    fromHeader: {
        maxTry: 5
    },
    fromUser: {
        path: '/welcome'
    }
}

function fetchOptions(opt?: DetectLocaleMiddlewareOptions): void{
    if(opt === null) options = opt;
    else{
        Object.getOwnPropertyNames(defaultOptions).forEach(name => {
            if(typeof opt[name] === 'object') {
                Object.getOwnPropertyNames(defaultOptions[name]).forEach(name => {
                    if(opt[name] === null) opt[name] = defaultOptions[name];
                });
            }
            else if(opt[name] === null) opt[name] = defaultOptions[name];
        });
    }
}



Object.freeze(defaultOptions);

let options: DetectLocaleMiddlewareOptions;

export default DetectLocaleMiddlewareOptions;
export {DetectLocaleMiddlewareOptions, options, fetchOptions}