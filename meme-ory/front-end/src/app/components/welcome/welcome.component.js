(function() { // TODO remove closure

    /* class WelcomeComponent constructor  */
    // TODO create a class
    function WelcomeComponent() {
    }

    /* method WelcomeComponent.render */
    WelcomeComponent.prototype.render = render;

    function render() {
        const form = document.querySelector('form.form-signin');

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            if (form.checkValidity() === false) {
                event.stopPropagation();
                form.classList.add('was-validated');
            } else {

                const name = event.srcElement.querySelector('#nickname').value;
                const size = parseInt(event.srcElement.querySelector('#size').value);

                _startGame(name, size);
            }
        }, false);

        return this;
    }

    function _startGame(name, size) {
        window.location = '../game/game.component.html?name=' + name + '&size=' + size;
    }

    // put component in global scope, to be runnable right from the HTML. TODO remove in step XXX
    window.WelcomeComponent = WelcomeComponent
})();