# normalize-html-table

Normalization of DOM table rows - creates a matrix with duplicate cells based on rowspan and colspan.  
Handy for scraping and paring of Wikipedia tables.

  * Vanialla DOM - *no dependencies*.
  * Does one job only - *rowspan* and *colspan*.
  
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

This will return a matrix or rows and cells. Each cell contains the `td` element.  
Each row will have a property `row` attached to them, in case you need to reference the original `tr` element.

### Notes

This library does not map to JavaScript Object, that's not the point of the library.  
It does not know how your headers are formatted, and does not need to.  
You must map it yourself. Example:

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

This library will also not convert cell data to text, that is also up to you.  

Library is not transpiled so it will only work in modern-ish browsers.  
For nodejs use [jsdom](https://github.com/jsdom/jsdom).
