const fs = require('fs');
var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();

let data = '';
let edit = false;
let currentFile = '';

function render() {
  var content = document.getElementById('content');
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
  if(edit) {
      const editArea = document.createElement('textarea');
      editArea.id = 'editor';
      editArea.value = data;
      content.appendChild(editArea);
      editArea.focus();

  } else {
      content.innerHTML = md.render(data);
  }
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
  currentFile = payload;
  if(watcher) {
    watcher.close();
  }
  readAndRender('/Users/juhofr/Documents/fireburn-docs/' + payload, () => {
    watcher = fs.watch('/Users/juhofr/Documents/fireburn-docs/' + payload, (eventType, filename) => {
      console.log(eventType);
      if(eventType === 'change') {
        readAndRender('/Users/juhofr/Documents/fireburn-docs/' + payload, () => {});
      }
    });
  });
});

window.eventbus.subscribe('TOGGLE_EDIT', () => {
  edit = !edit;
  render();
});

window.eventbus.subscribe('SAVE', () => {
  edit = !edit;
  var editor = document.getElementById('editor');
  fs.writeFile('/Users/juhofr/Documents/fireburn-docs/' + currentFile, editor.value, () => {
    render();
  });

});

render();
