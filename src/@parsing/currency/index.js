const tbody = document.getElementById('tbody');

let currencyList = [];

for (const tr of tbody.children) {
  const currency = {
    name: tr.children[1].innerText,
    value: tr.children[2].innerText,
  };
  if (
    currency.value &&
    currency.name &&
    !currencyList.map((item) => item.value).includes(currency.value)
  ) {
    currencyList.push(currency);
  }
}

downloadObjectAsJson(currencyList, 'currency-list');

function downloadObjectAsJson(exportObj, exportName) {
  const dataStr =
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(exportObj));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', exportName + '.json');
  document.body.appendChild(downloadAnchorNode); // требуется для Firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
