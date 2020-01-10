module.exports = table => {
  const res = [];

  table.querySelectorAll('tbody tr').forEach((row, y) =>
    row.querySelectorAll('td').forEach((cell, x) => {
      const rowspan = Number(cell.getAttribute('rowspan') || 1);
      const colspan = Number(cell.getAttribute('colspan') || 1);
      while (res[y] && res[y][x]) x++;
      for (let yy = y; yy < y + rowspan; yy++) {
        const resRow = res[yy] = res[yy] || [];
        for (let j = 0; j < colspan; j++) {
          resRow.row = row;
          resRow[x + j] = cell;
        }
      }
    })
  );

  return res.filter(row => row.length > 0);
};
