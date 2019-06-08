(function() {
    var environment = {
        api: {
            host: 'http://localhost:8081'
        }
    };


    /* class GameComponent constructor */
    // TODO create a class
    function GameComponent() {
        // gather parameters from URL
        var params = parseUrl();

        // save player name & game ize
        this._name = params.name;
        this._size = parseInt(params.size) || 9;
        this._flippedCard = null;
        this._matchedPairs = 0;
    }

    /* method GameComponent.render */
    GameComponent.prototype.render = render;
    
    /* method GameComponent.start */
    GameComponent.prototype.start = start;

    /* method GameComponent.fetchConfig */
    GameComponent.prototype.fetchConfig = fetchConfig;

    /* method GameComponent.gotoScore */
    GameComponent.prototype.gotoScore = gotoScore;

    /* method GameComponent._flipCard */
    GameComponent.prototype._flipCard = _flipCard;

    function render() {
        // fetch the cards configuration from the server
        this.fetchConfig((function(config) {
            // TODO replace this function with an arrow function
            this._config = config;

            // create a card out of the config
            this._cards = []; // TODO use Array.map()
            for (var i in this._config.ids) {
                this._cards[i] = new CardComponent(this._config.ids[i]);
            }

            this._boardElement = document.querySelector('.cards');
            
            for (var i in this._cards) {    // TODO use Array.forEach()
                (function() {
                    var card = this._cards[i];
                    this._boardElement.appendChild(card.getElement());
                    card.getElement().addEventListener('click', function() {this._flipCard(card) }.bind(this)); // TODO use arrow function.
                }).bind(this)();    // TODO Why bind(this)?
            }

            this.start();
        }).bind(this)); // why bind(this) ?
    }

    function start() {
        this._startTime = Date.now();
        var seconds = 0;
        document.querySelector('nav .navbar-title').textContent = `Player: ${this._name}. Elapsed time: ${seconds++}`;

        setInterval(function() { // TODO replace with arrow function. Why '.bind(this)' ?
            document.querySelector('nav .navbar-title').textContent = `Player: ${this._name}. Elapsed time: ${seconds++}`;
        }.bind(this), 1000);

        // build a card for each config.ids
    }

    function gotoScore() {
        var now = Date.now();
        var timeElapsedInSeconds = Math.floor((now - this._startTime )/1000);

        setTimeout(function() {  // TODO use arrow function.
            window.location = '../score/score.component.html?name=' + this._name + '&size=' + this._size + '&time=' + timeElapsedInSeconds;
        }.bind(this), 750);    // TODO Why bind(this)?
    }

    function fetchConfig(cb) {
        var xhr = typeof XMLHttpRequest != 'undefined'
            ? new XMLHttpRequest()
            : new ActiveXObject('Microsoft.XMLHTTP');

        xhr.open('get', environment.api.host + '/board?size=' + this._size, true);
        xhr.onreadystatechange = function() {
            var status;
            var data;
            // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
            if (xhr.readyState == 4) { // `DONE`
                status = xhr.status;
                if (status == 200) {
                    data = JSON.parse(xhr.responseText);
                    cb(data);
                } else {
                    throw new Error(status)
                }
            }
        };
        xhr.send();
    }

    function _flipCard(card) {
        if (this._busy) {
            return;
        }

        if (card.flipped) {
            return;
        }


        // flip the card
        card.flip();

        // if flipped first card of the pair
        if (!this._flippedCard) {
            // keep this card flipped, and wait for the second card of the pair
            this._flippedCard = card;
        } else {
            // second card of the pair flipped...

            // if cards are the same
            if (card.equals(this._flippedCard)) {
                this._flippedCard.matched = true;
                card.matched = true;
                this._matchedPairs += 1;

                // reset flipped card for the next turn.
                this._flippedCard = null;

                if (this._matchedPairs === this._size) {
                    this.gotoScore();
                }
            } else {
                this._busy = true;

                // cards did not match
                // wait a short amount of time before hiding both cards
                var _this = this;   // TODO why _this?
                setTimeout(function() { // TODO use arrow function

                    // hide the cards
                    _this._flippedCard.flip();
                    card.flip();
                    _this._busy = false;

                    // reset flipped card for the next turn.
                    _this._flippedCard = null;
                }, 500);
            }
        }
    }

    // put component in global scope, tu be runnable right from the HTML. TODO remove in step XXX
    window.GameComponent = GameComponent;

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
    })();
