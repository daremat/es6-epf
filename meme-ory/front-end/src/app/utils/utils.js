(function () {
    function parseUrl(url) {
        const query = url.split('?')[1] || '';
        const delimiter = '&';
        const result = {};

        const parts = query
            .split(delimiter);

        for (let i in parts) {
            const item = parts[i];
            const kv = item.split('=');
            result[kv[0]] = kv[1];
        }

        return result;
    }

    window.parseUrl = parseUrl;
})();