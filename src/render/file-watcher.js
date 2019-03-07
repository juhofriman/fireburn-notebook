const fs = require('fs');

const path = '/Users/juhofr/Documents/fireburn-docs';

function listAndEmit() {
  fs.readdir(path, (err, items) => {
    window.eventbus.publish('FILES_CHANGED', items.filter(item => item.endsWith('.md')));
  });
}

fs.watch(path, (eventType, filename) => {
  console.log(eventType);
  if(eventType === 'change' || !filename.endsWith('.md')) {
    return;
  }
  listAndEmit();
});

listAndEmit();