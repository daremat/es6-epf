export class UrlParser {
    constructor() {
        this._url = window.location;
    }

    _parse(string, delimiter) {
        const result = {};
        string
            .split(delimiter)
            .map(item => item.split('='))  // split on '='
            .forEach(function (kv) {
                result[kv[0]] = kv[1];
            });
        return result;
    }

    get search() {
        return this._parse(this._url.href.split('?')[1] || '', '&');
    }
}

export class Validator {

  constructor(rule) {
    this._rule = rule;
  }

  validate(value, callback = isValid => {}) {
    const isValid = this._rule(value);
    callback(isValid);
    return isValid;
  }
}
