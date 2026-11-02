const fs = require('fs');
const path = require('path');

const partsDir = path.join(__dirname, 'landscape_src');
const encoded = fs.readdirSync(partsDir)
  .filter(name => /^part-\d+\.b64$/.test(name))
  .sort()
  .map(name => fs.readFileSync(path.join(partsDir, name), 'utf8'))
  .join('')
  .replace(/\s+/g, '');

const source = Buffer.from(encoded, 'base64').toString('utf8');
const run = new Function('require', '__dirname', '__filename', source);
run(require, __dirname, __filename);
