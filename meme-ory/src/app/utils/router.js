import { isString, isFunction, get} from 'lodash';
import { getRenderId } from './component';

export class Router {

    constructor(outlet) {
        this._routesUrl = {};
        this._outlet =  outlet;

        window.addEventListener('beforeunload', event => this._onLocationChanged(event.newURL));
        window.addEventListener('hashchange', event => this._onLocationChanged(event.newURL));
    }

    navigate(route) {
        const componentCtor = this._routesUrl[url];

        if (!componentCtor) {
            throw new Error(`No component registered for route ${route}`);
        }

        return this._renderComponent(componentCtor);
    }

    location(url) {
        const component = this._routesUrl[url];

        if (!component) {
            throw new Error(`No component registered for url ${url}`);
        }

        return this._renderComponent(component);
    }

    register(url, componentCtor) {
        if (!componentCtor || !isFunction((componentCtor.prototype || {}).getTemplate)) {
            throw new TypeError(`provided arg should be a Component. Got: ${get(componentCtor, 'prototype.constructor.name', componentCtor)}`);
        }

        if (!isString(url)) {
            throw new TypeError(`provided route url should be a string. Got: ${url}`);
        } else {
            this._routesUrl[_getPath(url)] = componentCtor;
        }

        if (_getPath(window.location.href) === _getPath(url)) {
            this._renderComponent(componentCtor);
        }

        return this;
    }

    async _renderComponent(componentCtor) {
        const oldRenderId = getRenderId();
        const component = new componentCtor();

        component.render(this._outlet);
        if (oldRenderId === getRenderId()) {
            throw new Error(`Error while navigating to route ${route}: Component.render() not called. Did you forgot to call super.render()?`)
        }
    }

    _onLocationChanged(loc) {
        if (!loc) {
            return;
        }

        const path = _getPath(loc);
        const component = this._routesUrl[path];

        if (component) {
            this._renderComponent(component)
        } else if (loc.startsWith(window.location.origin)) {
            console.warn(`navigated to "${loc}, but no component was registered at this address"`)
        }
    }
}

function _getPath(url) {
    url = url.replace(new RegExp(`^${window.location.origin}`), '');
    url = url.split('?')[0];
    url = _removeTrailingSlash(url);

    return url;
}

function _removeTrailingSlash(str) {
    if (str.endsWith('/')) {
        str = str.substring(0, str.length - 1);
    }

    if (str.startsWith('/')) {
        str = str.substring(1);
    }

    if (str.startsWith('#')) {
        str = str.substring(1);
    }

    return str;
}
