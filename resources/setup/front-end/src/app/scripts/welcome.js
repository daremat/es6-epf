(function() {

    // TODO Step 2.1 create a class
    /* class WelcomeComponent constructor  */
    function WelcomeComponent() {
    }

    /* method WelcomeComponent.render */
    WelcomeComponent.prototype.render = render;

    function render() {
        var form = document.querySelector('form.form-signin');

        form.addEventListener('submit', function(event) {     // TODO Step 2.2: use arrow function

            event.preventDefault();
            if (form.checkValidity() === false) {
                event.stopPropagation();
                form.classList.add('was-validated');
            } else {
                var name = event.srcElement.querySelector('#nickname').value;
                var size = parseInt(event.srcElement.querySelector('#size').value);

                _startGame(name, size);
            }
        }, false);

        return this;
    }

    function _startGame(name, size) {
        // TODO Step 2.2: use template literals
        window.location = './game.html?name=' + name + '&size=' + size;
    }

    // put component in global scope, tu be runnable right from the HTML. TODO remove in step XXX
    window.WelcomeComponent = WelcomeComponent
})();