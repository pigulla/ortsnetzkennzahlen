const url = require('url');

const decompress = require('decompress');
const fs = require('mz/fs');
const JSONs = require('json-strictify');
const parse_csv = require('neat-csv');
const request = require('request-promise');

function strip_eof(buffer) {
    const last = buffer[buffer.length - 1];

    return last === 26 ? buffer.slice(0, buffer.length - 1) : buffer;
}

// Get the data here:
// https://www.bundesnetzagentur.de/cln_1432/DE/Sachgebiete/Telekommunikation/Unternehmen_Institutionen/Nummerierung/Rufnummern/ONRufnr/ON_Einteilung_ONB/ON_ONB_ONKz_ONBGrenzen_Basepage.html?nn=316054

(async function () {
    const uri = url.parse(process.argv[2]);

    const response = await request.get({
        uri,
        encoding: null,
        resolveWithFullResponse: true
    });

    if (response.statusCode !== 200) {
        throw new Error(`Unexpected status code: ${response.statusCode}`);
    }

    const inner_archive = await decompress(response.body);
    const result = await decompress(inner_archive[0].data);
    const data = strip_eof(result[0].data);

    const parsed = await parse_csv(data, { separator: ';' });
    const converted = parsed.map(row => ({
        number: parseInt(row.Ortsnetzkennzahl, 10),
        name: row.Ortsnetzname,
        active: parseInt(row.KennzeichenAktiv, 10) > 0
    }));

    await fs.writeFile('data.json', JSONs.stringify(converted, null, 4));
})();
