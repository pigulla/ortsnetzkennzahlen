# Ortsnetzkennzahlen

> Liste der deutschen Ortsnetzkennzahlen (Vorwahlen)

Die Liste enthält alle Vorwahlen, wie sie von der [Bundesnetzagentur](https://www.bundesnetzagentur.de/cln_1432/DE/Sachgebiete/Telekommunikation/Unternehmen_Institutionen/Nummerierung/Rufnummern/ONRufnr/ON_Einteilung_ONB/ON_ONB_ONKz_ONBGrenzen_Basepage.html?nn=316054) bereitgestellt werden.

### Benutzung

```bash
npm install ortskennzahlen
```

```js
const { data, by_number } = require('ortskennzahlen');

// by_number ist eine Map aller aktiven Einträge, indiziert nach Vorwahlen
by_number.get(89);   // -> 'München'
by_number.get('89'); // -> undefined

// data enthält eine Liste aller Einträge, z.B.:
console.dir(data[0]);
// { number: 201, name: 'Essen', active: true }
```
