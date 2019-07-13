import { textAbbriviatedConfiguration } from './electron_config.js';
import './custom.css';
import './periodic_table.less';

document.addEventListener('DOMContentLoaded', () => {
  const periodicTable = document.getElementById('periodic-table');
  for(const row of periodicTable.children) {
    for(const cell of row.children) {
      const element = cell.children[0];
      if(!element) {
        continue;
      }
      const details = element.children[2];

      const atomicNumber = parseInt(element.children[0].innerHTML);
      const configurations = textAbbriviatedConfiguration(atomicNumber);
      details.appendChild(document.createElement('br'));
      details.appendChild(document.createTextNode(configurations))
    }
  }
});