const test = require('ava');
const browserEnv = require('browser-env');
const normalizeHtmlTable = require('./index.js');

browserEnv();

function tableToText(table) {
  return normalizeHtmlTable(table).map(row => row.map(cell => cell.textContent.trim()));
}

test('rowspan', t => {
  // Demo data based on https://no.wikipedia.org/wiki/Liste_over_norske_kommunenummer#Viken
  document.body.innerHTML = `<table>
  <tr>
    <td>3001</td>
    <td>Halden</td>
    <td>2020 (1.1.)</td>
    <td>0101 Halden</td>
    <td rowspan="4">Østfold</td>
  </tr>
  <tr>
    <td>3002</td>
    <td>Moss</td>
    <td>2020 (1.1.)</td>
    <td>0104 Moss<br/>0136 Rygge</td>
  </tr>
  <tr>
    <td>3003</td>
    <td>Sarpsborg</td>
    <td>2020 (1.1.)</td>
    <td>0105 Sarpsborg</td>
  </tr>
  <tr>
    <td>3004</td>
    <td>Fredrikstad</td>
    <td>2020 (1.1.)</td>
    <td>0106 Fredrikstad</td>
  </tr>
  <tr>
    <td rowspan="2">3005</td>
    <td rowspan="2">Drammen</td>
    <td rowspan="2">2020 (1.1.)</td>
    <td>0602 Drammen<br/>0625 Nedre Eiker</td>
    <td>Buskerud</td>
  </tr>
  <tr>
    <td>0711 Svelvik</td>
    <td>Vestfold</td>
  </tr>
  <tr>
    <td>3006</td>
    <td>Kongsberg</td>
    <td>2020 (1.1.)</td>
    <td>0604 Kongsberg</td>
    <td rowspan="2">Buskerud</td>
  </tr>
  <tr>
    <td>3007</td>
    <td>Ringerike</td>
    <td>2020 (1.1.)</td>
    <td>0605 Ringerike</td>
  </tr>
  <tr>
    <td rowspan="2">3026</td>
    <td rowspan="2">Aurskog-Høland</td>
    <td rowspan="2">2020 (1.1.)</td>
    <td>0121 Rømskog</td>
    <td>Østfold</td>
  </tr>
  <tr>
    <td>0222 Aurskog-Høland</td>
    <td rowspan="6">Akershus</td>
  </tr>
  <tr>
    <td>3027</td>
    <td>Rælingen</td>
    <td>2020 (1.1.)</td>
    <td>0228 Rælingen</td>
  </tr>
  <tr>
    <td>3028</td>
    <td>Enebakk</td>
    <td>2020 (1.1.)</td>
    <td>0229 Enebakk</td>
  </tr>
  <tr>
    <td>3029</td>
    <td>Lørenskog</td>
    <td>2020 (1.1.)</td>
    <td>0230 Lørenskog</td>
  </tr>
  <tr>
    <td>3030</td>
    <td>Lillestrøm</td>
    <td>2020 (1.1.)</td>
    <td>0226 Sørum<br/>0227 Fet<br/>0231 Skedsmo</td>
  </tr>
  <tr>
    <td>3031</td>
    <td>Nittedal</td>
    <td>2020 (1.1.)</td>
    <td>0233 Nittedal</td>
  </tr>
  </tbody>
</table> `;
  t.deepEqual(tableToText(document.body.querySelector('table')), [
      [
        "3001",
        "Halden",
        "2020 (1.1.)",
        "0101 Halden",
        "Østfold"
      ],
      [
        "3002",
        "Moss",
        "2020 (1.1.)",
        "0104 Moss0136 Rygge",
        "Østfold"
      ],
      [
        "3003",
        "Sarpsborg",
        "2020 (1.1.)",
        "0105 Sarpsborg",
        "Østfold"
      ],
      [
        "3004",
        "Fredrikstad",
        "2020 (1.1.)",
        "0106 Fredrikstad",
        "Østfold"
      ],
      [
        "3005",
        "Drammen",
        "2020 (1.1.)",
        "0602 Drammen0625 Nedre Eiker",
        "Buskerud"
      ],
      [
        "3005",
        "Drammen",
        "2020 (1.1.)",
        "0711 Svelvik",
        "Vestfold"
      ],
      [
        "3006",
        "Kongsberg",
        "2020 (1.1.)",
        "0604 Kongsberg",
        "Buskerud"
      ],
      [
        "3007",
        "Ringerike",
        "2020 (1.1.)",
        "0605 Ringerike",
        "Buskerud"
      ],
      [
        "3026",
        "Aurskog-Høland",
        "2020 (1.1.)",
        "0121 Rømskog",
        "Østfold"
      ],
      [
        "3026",
        "Aurskog-Høland",
        "2020 (1.1.)",
        "0222 Aurskog-Høland",
        "Akershus"
      ],
      [
        "3027",
        "Rælingen",
        "2020 (1.1.)",
        "0228 Rælingen",
        "Akershus"
      ],
      [
        "3028",
        "Enebakk",
        "2020 (1.1.)",
        "0229 Enebakk",
        "Akershus"
      ],
      [
        "3029",
        "Lørenskog",
        "2020 (1.1.)",
        "0230 Lørenskog",
        "Akershus"
      ],
      [
        "3030",
        "Lillestrøm",
        "2020 (1.1.)",
        "0226 Sørum0227 Fet0231 Skedsmo",
        "Akershus"
      ],
      [
        "3031",
        "Nittedal",
        "2020 (1.1.)",
        "0233 Nittedal",
        "Akershus"
      ]
    ]
  );
});

test('colspan', t => {
  document.body.innerHTML = `<table>
  <tbody>
  <tr>
    <td rowspan="2">a1</td>
    <td>b1</td>
    <td rowspan="1">c1</td>
    <td>d1</td>
  </tr>
  <tr>
    <td colspan="2">a2</td>
    <td>b2</td>
  </tr>
  </tbody>
</table>`;

  t.deepEqual(tableToText(document.body.querySelector('table')), [
    ['a1', 'b1', 'c1', 'd1'],
    ['a1', 'a2', 'a2', 'b2']
  ]);
});
