import 'whatwg-fetch'
import 'es6-promise'

export function fetchget(url) {
    const result = fetch(url, {
        credentials: 'include',
        headers: {
            'Accept': 'application/json, textain, */*'
        }
    })
    return result.then(response => response.json())
}
export function fetchpost(url, paramsObj) {
    var result = fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: obj2params(paramsObj)
    });
    return result.then(response => response.json());
}
function obj2params(obj) {
    var result = '';
    var item;
    for (item in obj) {
        result += '&' + item + '=' + encodeURIComponent(obj[item]);
    }
    if (result) {
        result = result.slice(1);
    }
    return result;
}
