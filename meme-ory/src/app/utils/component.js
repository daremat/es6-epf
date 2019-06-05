let renderId = 0;

export function getRenderId() {
    return renderId;
}

export class Component {
    /**
     *
     * @param name the name of component tag. ie: This component will be inserted as <name> within the DOM.
     */
    constructor(name) {
        if (!name) {
            throw new TypeError('you should give a name to components');
        }

        this._elt = document.createElement(name);
        this._elt.innerHTML = this.getTemplate();
    }

    /**
     * Automatically called by the router just after the constructor is called.
     * This lifecycle hook is for you to do some - possibly asynchronous - work, before the component is rendered (eg: component.render() is called).
     * @returns {Component}
     */
    init() {
        return this;
    }

    /**
     * Called by
     */
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