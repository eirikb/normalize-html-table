# normalize-html-table

Normalization of DOM table rows - creates a matrix with duplicate cells based on rowspan and colspan.  
Handy for scraping and parsing of Wikipedia tables.

  * Vanilla DOM - **no dependencies**.
  * Does one job only - **rowspan** and **colspan**.
  
  
[![npm](https://img.shields.io/npm/v/@eirikb/normalize-html-table.svg)](https://npmjs.org/package/@eirikb/normalize-html-table)
[![Build](https://github.com/eirikb/normalize-html-table/workflows/Build/badge.svg)](https://github.com/eirikb/normalize-html-table/actions?query=workflow%3ABuild)

### Usage
 
 ```bash
npm i @eirikb/normalize-html-table
 ```

```js
import normalizeHtmlTable from '@eirikb/normalize-html-table';

const table = document.querySelector('table');
const rows = normalizeHtmlTable(table);
console.log(rows);
```

This will return a matrix of rows and cells. Each cell contains the `td` element.  
Each row will have a property `row` attached to them, in case you need to reference the original `tr` element.  
E.g.,
```js
  console.log(rows[0].row); // tr element
```

### Notes

This library will _not_:
  * Map your table to a JavaScript object.
  * Do anything with your headers.
  * Convert cells to text.
  * Support older browsers (you must transpile it).
  
All above can be solved by you, and does not fit into this library.
E.g., converting to JavaScript object with cells turned into text can be done like this:  

```js
function tableToJson(table) {
  const headers = [...table.querySelectorAll('th')].map(th => th.textContent.trim());
  return normalizeHtmlTable(table).map(row =>
    headers.reduce((res, header, index) => {
      res[header] = row[index].textContent.trim();
      return res;
    }, {})
  );
}
```

For nodejs support use [jsdom](https://github.com/jsdom/jsdom).
