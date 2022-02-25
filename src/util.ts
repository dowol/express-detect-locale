const re = {
    locale : /^[a-z]{2,3}(-[A-Z][a-z]{3})?(-[A-Z]{2})?$/i,
    language: /[a-z]{2,3}/,
    script: /[A-Z][a-z]{3}/,
    region: /[A-Z]{2}/
}

function reformat(locale: string): string{
    if(re.locale.test(locale)){

    }
    else{
        let e = new Error('');
        e['code'] = 'LOCALE_FORMAT_ERROR';
        e['input'] = locale;
    }
}

export {re, reformat};