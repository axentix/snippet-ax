const path = require('path');
const fs = require('fs');

const DIR = './snippets';

const Combine = (() => {
  const getFile = (file) => {
    return fs.readFileSync(file);
  };

  const getFiles = (dirname) => {
    let files = [];

    const filenames = fs.readdirSync(dirname);
    filenames.map((filename) => {
      const file = path.resolve(dirname, filename);
      const stat = fs.statSync(file);

      if (stat && stat.isDirectory()) {
        files.push(...getFiles(file));
      } else {
        const content = getFile(file);
        files.push(JSON.parse(content));
      }
    });

    return files;
  };

  const run = (dirname = DIR) => {
    const files = getFiles(dirname);
    data = Object.assign({}, ...files);

    const outputDir = path.resolve(dirname, 'snippets.code-snippets');

    fs.writeFileSync(outputDir, JSON.stringify(data));

    console.log('[Combine] Successfully combined json files');
  };

  return {
    run,
  };
})();

Combine.run();
