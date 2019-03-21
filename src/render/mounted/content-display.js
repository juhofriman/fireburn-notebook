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
    const editForm = document.createElement('form');
    editForm.className = 'pure-form';
      const editArea = document.createElement('textarea');
      editArea.className = 'pure-input-1 editor';
      editArea.id = 'editor';
      editArea.value = data;
      editArea.rows = 30;
      editArea.cols = 80;
      editForm.appendChild(editArea);
      content.appendChild(editForm);
      editArea.focus();

  } else {
      content.innerHTML = md.render(data);
  }
}

window.eventbus.readState('FILEDATA', (filedata) => {
  data = filedata;
  render();
});

window.eventbus.subscribe('TOGGLE_EDIT', () => {
  edit = !edit;
  render();
});

window.eventbus.subscribe('SAVE', () => {
  edit = !edit;
  var editor = document.getElementById('editor');
  window.eventbus.updateState('FILEDATA', () => editor.value);
  window.eventbus.publish('PERSIST_FILE');

});

render();
