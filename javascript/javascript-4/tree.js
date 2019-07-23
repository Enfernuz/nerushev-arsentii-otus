// implementation
const fsPromises = require('fs').promises;

const fileWalker = async function* (path) {

  const promise = fsPromises.readdir(path, {withFileTypes: true});
  
  const files = await promise;
  for (const file of files) {
    file.relativePath = `${path}\\${file.name}`
    yield file;
    if (file.isDirectory()) {
      yield* fileWalker(file.relativePath);
    }
  }
};

const treeAsync = async (path) => {
  
  const result = {
    files: [],
    dirs: [path]
  };

  for await (const file of fileWalker(path)) {
    const dst = file.isDirectory() ? result.dirs : result.files;
    dst.push(file.relativePath);
  }
  
  return result;
};

// program

const _path = process.argv[2];
if (_path) {
  treeAsync(_path).then(console.log);
}

module.exports = treeAsync;
