import { textAbbriviatedConfiguration } from './electron_config.js';
import './custom.css';
import './periodic_table.less';

document.addEventListener('DOMContentLoaded', () => {
  const periodicTable = document.getElementById('periodic-table');
  for(const row of periodicTable.children) {
    for(const cell of row.children) {
      const element = cell.children[0];
      const atomicNumber = parseInt(element.children[0].innerHTML);

      const configuration = textAbbriviatedConfiguration(atomicNumber);
      const node = document.createElement('div');
      node.innerHTML = configuration;
      node.classList.add('electron-config');
      element.insertBefore(node, element.childNodes[0]);
    }
  }
});