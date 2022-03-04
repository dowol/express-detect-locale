import {Request, Response} from "express";
import {re, reformat} from "./util";

type LocaleDetector = (req: Request, res: Response) => LocaleDetectorResult;

type LocaleDetectorResult = string | undefined;

/**
 * Gets an Locale code string from URL query on express requests.
 * @returns {string | undefined} Locale code string or undefined if doesn't exist.
 */
function fromQuery(req: Request, res: Response): LocaleDetectorResult{
    let result = String(req.query.lang ?? '');
    if(result !== '' && re.test(result)) {
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

/**
 * Gets an Locale code string from HTTP cookies on express requests.
 * @returns {string | undefined} Locale code string or undefined if doesn't exist.
 */
function fromCookie(req: Request, res: Response): LocaleDetectorResult{
    let result = String(req.cookies.lang ?? '');
    if(result !== '' && re.test(result))
        return reformat(result);
    else return undefined;
}

/**
 * Gets an Locale code string from HTTP header(Accept-Language) on express requests.
 * @returns {string | undefined} Locale code string or undefined if doesn't exist.
 */
function fromHeader(req: Request, res: Response): LocaleDetectorResult {
    let hv = req.headers['accept-language'].split(/\s*,\s*/);
    if(hv.length === 0) return undefined;
    else if(hv.length === 1) return reformat(re.exec(hv[0])[0]);
    else{
        return reformat(re.exec(hv[0])[0]);
    }
}

export {fromQuery, fromCookie, fromHeader, LocaleDetector, LocaleDetectorResult};