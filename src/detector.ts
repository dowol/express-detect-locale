import {Request, Response} from "express";
import {re, reformat} from "./util";

type LocaleDetector = (req: Request, res: Response) => LocaleDetectorResult;

type LocaleDetectorResult = string | undefined;

/**
 *
 * @returns {string | undefined}
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
 *
 * @returns {string | undefined}
 */
function fromCookie(req: Request, res: Response): LocaleDetectorResult{
    let result = String(req.cookies.lang ?? '');
    if(result !== '' && re.test(result))
        return reformat(result);
    else return undefined;
}

/**
 *
 * @returns {string | undefined}
 */
function fromHeader(req: Request, res: Response): LocaleDetectorResult {
    let hv = req.headers['accept-language'].split(/2/);
    throw new Error();
}

export {fromQuery, fromCookie, fromHeader, LocaleDetector, LocaleDetectorResult};