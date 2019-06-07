export function parseUrl() {
    const url = window.location;
    const query = url.href.split('?')[1] || '';
    const delimiter = '&';
    const result = {};

    query
        .split(delimiter)
        .map(item => item.split('='))  // split on '='
        .forEach(function (kv) {
            result[kv[0]] = kv[1];
        });
    return result;
}
