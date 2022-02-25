import {Request, Response, NextFunction} from 'express';
import {opt, defaultOptions} from './DetectLocale';
import {reformat} from './util';

export default function DetectLocaleMiddleware(req: Request, res: Response, next: NextFunction){
    let locale : string;
    for(var detector of (opt.priority ?? defaultOptions.priority)){
        locale = detector(req);
        if(locale != null) break;
    }
    if(locale) {
        Object.defineProperty(req, 'locale', {
            get(): string {return reformat(locale);}
        });
        next();
    }
    else if(opt.chooseByUser?.enable ?? defaultOptions.chooseByUser?.enable){
        res.redirect(302, opt.chooseByUser.redirection ?? defaultOptions.chooseByUser.redirection);
    }
    else next();
}
