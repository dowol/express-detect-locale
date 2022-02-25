import {Request, Response} from 'express';
import {opt, defaultOptions} from './DetectLocale';

type LocaleDetector = (req: Request) => string|null;

const fromQuery: LocaleDetector = (req) => {
    try{
        let result = req.query[opt.fromQuery.key ?? defaultOptions.fromQuery.key];
        return result ? String(result) : null;
    }
    catch(e){
        return null;
    }
}

const fromCookie : LocaleDetector = (req) => {
    try{
        let result = req.cookies[opt.fromCookie.key ?? defaultOptions.fromCookie.key];
        return result ? String(result) : null;
    }
    catch(e){
        return null;
    }
}

const fromHeader : LocaleDetector = (req) => {
    try{
        let h = req.headers['accept-language']
    }
    catch(e) {
        return null;
    }
}

export {fromQuery, fromCookie, fromHeader, LocaleDetector};