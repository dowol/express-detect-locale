const re = {
    locale : /^[a-z]{2,3}(-[A-Z][a-z]{3})?(-[A-Z]{2})?$/i,
    language: /[a-z]{2,3}/,
    script: /[A-Z][a-z]{3}/,
    region: /[A-Z]{2}/
}

Object.freeze(re);

function reformat(locale: string): string{
    if(re.locale.test(locale)){
        let s = locale.split('-');
        let result = s[0].toLowerCase();
        if(s[1]){
            result += '-';
            if(s[1].length == 4){
                result += s[1][0].toUpperCase() + s[1].substring(1).toLowerCase();
                if(s[2]) result += '-' + s[2].toUpperCase();
            }
            else if(s[1].length == 2) result += s[1].toUpperCase();
        }
        return result;
    }
    else{
        let e = new Error('');
        e['code'] = 'LOCALE_FORMAT_ERROR';
        e['input'] = locale;
        throw e;
    }
}

export {re, reformat};