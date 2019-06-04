let renderId = 0;

export function getRenderId() {
    return renderId;
}

export class Component {

    constructor(name) {
        if (!name) {
            throw new TypeError('you should give a name to components');
        }

        this._elt = document.createElement(name);
        this._elt.innerHTML = this.getTemplate();
    }

    init() {
        return this;
    }

    getTemplate() {
        throw new Error('you should override "Component.getTemplate()"');
    }

    getElement() {
        return this._elt;
    }

    render(outlet) {
        renderId++;

        if (!outlet) {
            throw new TypeError('outlet is null! Did you forget to pass outlet to `super.render(outlet)`?');
        }

        // replace the old content by the new one
        if (outlet.firstChild) {
            outlet.replaceChild(this.getElement(), outlet.firstChild);
        } else {
            outlet.appendChild(this.getElement());
        }
    }
}