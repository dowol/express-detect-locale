import {Request, Response, NextFunction} from 'express';
import DetectLocaleMiddlewareOptions, {options, fetchOptions} from './options';

/**
 * Gets an Express.js Detect-Locale middleware function to use your projects.
 * @param {DetectLocaleMiddlewareOptions} opt Options for the Detect-Locale middleware. If null, use default options.
 * @returns {(req: Request, res: Response, next: NextFunction) => void} Detect-Locale middleware functions
 */
function DetectLocale(opt?: DetectLocaleMiddlewareOptions) {
    if(opt) fetchOptions(opt);
    return function(req: Request, res: Response, next: NextFunction): void{
        let locale: string;
        for(let finder of options.priority){
            locale = finder(req, res);
            if(locale !== undefined) {
                Object.defineProperty(req, 'locale', { get(){ return locale; }});
                res.setHeader('Content-Language', locale);
                break;
            }
        }
        //@ts-ignore
        //if(req.locale) next();
        //else res.redirect(302, '/welcome');
        next();
    };
}

export default DetectLocale;