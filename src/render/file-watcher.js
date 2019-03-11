const fs = require('fs');

const path = '/Users/juhofr/Documents/fireburn-docs';

function listAndEmit() {
  fs.readdir(path, (err, items) => {
    window.eventbus.updateState('FILE_LISTING', (oldState) => items.filter(item => item.endsWith('.md')));
  });
}

fs.watch(path, (eventType, filename) => {
  console.log(eventType);
  if(eventType === 'change' || !filename.endsWith('.md')) {
    return;
  }
  listAndEmit();
});

let watcher = null;

function emitNewFileData(file) {
  fs.readFile(path + '/' + file, 'utf8', (err, data) => {
    window.eventbus.updateState('FILEDATA', () => data);
  });
}

window.eventbus.readState('currentFile', (currentFile, state) => {
  if(watcher) {
    watcher.close();
  }
  watcher = fs.watch(path + '/' + currentFile, (eventType, filename) => {
    if(eventType === 'change') {
      emitNewFileData(filename);
    }
  });
  emitNewFileData(currentFile);
});

window.eventbus.subscribe('PERSIST_FILE', () => {
  fs.writeFile(path + '/' + window.eventbus.getState('currentFile'), window.eventbus.getState('FILEDATA'), 'utf8', () => {
    console.log('Persisted file');
  });
});

listAndEmit();