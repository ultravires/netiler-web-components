import BaseComponent from "@packages/base";
import style from './index.css?inline' assert { type: 'css' } ;

export default class NtTable extends BaseComponent {
  static componentName = 'nt-table';

  static get observedAttributes() {
    return [ 'data', 'columns'];
  }

  constructor() {
    super();
    this.adoptStyleSheet( style );
    const data = JSON.parse(this.getAttribute('data'));
    const columns = JSON.parse(this.getAttribute('columns'));
    this.render(data, columns);
  }

  render(data, columns) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const thead_tr = document.createElement('tr');
    thead.appendChild(thead_tr);
    table.appendChild(thead);
    table.appendChild(tbody);
    for (let i = 0, len = columns.length; i < len; i++) {
      const column = columns[i];
      const label = column['label'];
      const prop = column['prop'];
      const th = document.createElement('th');
      th.innerText = label;
      thead_tr.appendChild(th);
    }
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];
      const tr = document.createElement('tr');
      for (let j = 0, len = columns.length; j < len; j++) {
        const column = columns[j];
        const td = document.createElement('td');
        td.innerText = item[column.prop];
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
    this.shadowRoot.appendChild(table);
  }

  get data() {
    return JSON.parse(this.getAttribute('data'));
  }

  set data(value) {
    this.setAttribute('data', JSON.stringify(value));
  }

  get columns() {
    return JSON.parse(this.getAttribute('columns'));
  }

  set columns(value) {
    this.setAttribute('columns', JSON.stringify(value));
  }

  attributeChangedCallback(prop, oldValue, newValue) {
    if ( oldValue === newValue ) return;
    this[prop] = JSON.parse(newValue);
  }
}