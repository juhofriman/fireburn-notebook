const fs = require('fs');
var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();

let data = '';

function render() {
  var content = document.getElementById('content');
  content.innerHTML = md.render(data);
}

function readAndRender(path, cb) {
  fs.readFile(path, 'utf8', function(err, file) {
      data = file;
      render();
      cb();
  });
}

 let watcher = null;

window.eventbus.subscribe('OPEN_FILE', (payload) => {
  console.log('Opening file: ' + payload);
  if(watcher) {
    watcher.close();
  }
  readAndRender('/Users/juhofr/Documents/fireburn-docs/' + payload, () => {
    watcher = fs.watch('/Users/juhofr/Documents/fireburn-docs/' + payload, (eventType, filename) => {
      console.log(eventType);
      if(eventType === 'change') {
        readAndRender('/Users/juhofr/Documents/fireburn-docs/' + payload);
      }
    });
  });

});

render();
