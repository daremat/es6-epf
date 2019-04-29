import 'semantic-ui-css/semantic.min.css';
import 'Styles/style.scss';
import './end.scss';
import moment from 'moment';
import { capitalize } from 'lodash';
import { findGetParameter, Storage } from "../../utils/utils";
import localforage from "localforage";

const name = capitalize(findGetParameter(location.search,'name')) || 'empty';
const size = parseInt(findGetParameter(location.search,'size')) || 9;
const time = parseInt(findGetParameter(location.search,'time')) || 2;

document.getElementById('name').innerText = name;
document.getElementById('size').innerText = size;
document.getElementById('time').innerText = time;

JSON.parse(sessionStorage.getItem('games') || '[]')
    .forEach(d => writeTableColumn('history-session', d));

localforage.getItem('games')
     .then(data => data.forEach(d=> writeTableColumn('history-local', d)));

const indexedDBStorage = new Storage();
indexedDBStorage._idb.onsuccess = () => {
    indexedDBStorage.readAll().then(
        data => data.forEach(d => writeTableColumn('history-indexed', d)));
};

function writeTableColumn(tableId, {date, name, size, time}) {
    let tr = document.createElement('tr');
    tr.innerHTML =`<tr>
                    <td data-label="Date">${moment(date).format('DD/MM/YY - hh:mm:ss')}</td>
                    <td data-label="Name">${name}</td>
                    <td data-label="Size">${size * 2}</td>
                    <td data-label="Time">${time}s</td>
                </tr>`;
    document.getElementById(tableId).appendChild(tr);
}
