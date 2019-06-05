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
     * Called by the Component constructr to create an element out of the component's HTML.
     * You MUST override this method in your component subclasses
     */
    getTemplate() {
        throw new Error('you should override "Component.getTemplate()"');
    }

    /**
     * returns the HTML element that was created for this component out of getTemplate()
     * @returns {HTMLElement}
     */
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