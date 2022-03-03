import {Request, Response, NextFunction} from 'express';

const re = /^[a-z]{2,3}(-[A-Z][a-z]{3})?(-[A-Z]{2})?$/i;

const finders = [fromQuery, fromCookie];

function DetectLocale(): ExpressMiddleware {
    return function(req: Request, res: Response, next: NextFunction){
        let locale: string;
        for(let finder of finders){
            locale = finder(req, res);
            if(locale !== undefined) {
                Object.defineProperty(req, 'locale', { get(){ return locale; }});
                break;
            }

        }
        next();
    };
}

function fromQuery(req: Request, res: Response): LocaleFinderResult{
    let result = String(req.query.lang ?? '');
    if(result && re.test(result)) {
        result = reformat(result);
        //if(option.fromQuery.writeToCookie)
            res.cookie('lang', result, {
                secure: true,
                path: '/',
                expires: (()=>{let d=new Date();d.setMonth(d.getMonth()+6);return d;})()
            });
        return result;
    }
    else return undefined;
}

function fromCookie(req: Request): LocaleFinderResult{
    let result = String(req.cookies.lang ?? '');
    if(result && re.test(result))
        return reformat(result);
    else return undefined;
}

function reformat(locale: string): string{
    if(!re.test(locale)) throw new Error();
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


type ExpressMiddleware = (req: Request, res: Response, next? : NextFunction) => void;
type LocaleFinderResult = string | undefined;
type LocaleFinder = (req: Request, res?: Response) => LocaleFinderResult;


export default DetectLocale;
export {LocaleFinder,reformat};