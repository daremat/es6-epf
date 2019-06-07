(function() {   // TODO remove closure

    /* class ScoreComponent constructor */
    // TODO create a class
    function ScoreComponent() {
        const params = parseUrl();
        this.name = params.name;
        this.size = parseInt(params.size);
        this.time = parseInt(params.time);
    }

    /* method ScoreComponent.render */
    ScoreComponent.prototype.render = render;

    function render() {
        document.getElementById('name').innerText = this.name;
        document.getElementById('size').innerText = this.size;
        document.getElementById('time').innerText = this.time;
    }

    function parseUrl() {
        var url = window.location;
        var query = url.href.split('?')[1] || '';
        var delimiter = '&';
        var result = {};

        var parts = query
            .split(delimiter);

        for (let i in parts) {
            var item = parts[i];
            var kv = item.split('=');
            result[kv[0]] = kv[1];
        }

        return result;
    }

    window.ScoreComponent = ScoreComponent;
})();
