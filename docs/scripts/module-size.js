const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const root = path.resolve(__dirname, '../../src');

const stats = [];

async function traverseFolder(dirPath, stats) {
  const promises = [];

  fs.readdirSync(dirPath).forEach(function(file) {
    let filePath = path.join(dirPath , file);
    // Ignore dot files
    if (file.startsWith('.')) return;
    let stat = fs.statSync(filePath);

    promises.push(new Promise(async function(resolve, reject) {
      if (stat.isDirectory()) {
        await traverseFolder(filePath, stats);
        resolve();
      } else {
        let fileContents = fs.readFileSync(filePath, "utf8");

        // Remove comments
        // fileContents = fileContents.replace(/(\/\*([\s\S]*?)\*\/)|(\/\/(.*)$)/gm, '');

        // gzip compress
        const compressedSize = zlib.gzipSync(fileContents).length;

        // Add file stats
        stats.push({ 'path': '/src/' + filePath.slice(root.length+1), 'size': stat.size, 'compressed': compressedSize });

        resolve();
      }
    }));
  });

  return Promise.all(promises);
}

traverseFolder(root, stats).then(function(foo) {
  fs.writeFileSync(path.resolve(__dirname, '../src/module-size.json'), JSON.stringify(stats));
});
