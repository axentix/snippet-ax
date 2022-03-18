const path = require('path');
const fs = require('fs');

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
        try {
          const content = getFile(file);
          files.push(JSON.parse(content));
        } catch (error) {
          console.error(`[Combine] Unable to parse file : ${file}`);
        }
      }
    });

    return files;
  };

  const clean = (output) => {
    if (fs.existsSync(output)) fs.unlinkSync(output);
  };

  const run = (dirname = './snippets') => {
    const output = path.resolve(dirname, 'snippets.code-snippets');

    clean(output);

    const files = getFiles(dirname);
    data = Object.assign({}, ...files);

    fs.writeFileSync(output, JSON.stringify(data));

    console.log('[Combine] Successfully combined json files');
  };

  return {
    run,
  };
})();

Combine.run();
