(function() {   // TODO remove closure

    /* class ScoreComponent constructor */
    // TODO create a class
    function ScoreComponent() {
        const params = parseUrl(window.location.href);
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

    window.ScoreComponent = ScoreComponent;
})();
