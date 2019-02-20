export function findGetParameter(queryString, parameterName) {
    let result = null,
        tmp = [];
    queryString
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
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

export class Storage {

    constructor() {
        if (!('indexedDB' in window)) {
            console.log('This browser doesn\'t support IndexedDB');
            return;
        }
        let idb = indexedDB.open('memory', 1);
        this._idb = idb;

        idb.onupgradeneeded = e => {
            console.info('constructor - open/create DB');
            if (!e.target.result.objectStoreNames.contains('game')) {
                e.target.result.createObjectStore('game',{keyPath: 'id', autoIncrement: true});
            }
        };
    }

    write(data) {
        const tx = this._idb.result.transaction('game', 'readwrite');
        const gameStore = tx.objectStore('game');
        gameStore.add(data);
        return new Promise((resolve, reject) => {
            tx.oncomplete = resolve;
            tx.onerror = reject;
        });
    }

    readAll() {
        const tx = this._idb.result.transaction('game', 'readonly');
        const gameStore = tx.objectStore('game');
        const get = gameStore.getAll();
        return new Promise((resolve, reject) => {
            get.onsuccess = e => resolve(e.target.result);
            get.onerror = reject;
        });
    }
}
