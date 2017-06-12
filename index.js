const data = require('./data.json');

const kv_pairs = data
    .filter(item => item.active)
    .map(item => [item.number, item.name]);

module.exports.data = data;
module.exports.by_number = new Map(kv_pairs);