const fs = require('fs');
var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();

let data = '';

function render() {
  var content = document.getElementById('content');
  content.innerHTML = md.render(data);
}


window.eventbus.subscribe('OPEN_FILE', (payload) => {
  console.log('Opening file: ' + payload);
  fs.readFile('/Users/juhofr/Documents/fireburn-docs/' + payload, 'utf8', function(err, file) {
      data = file;
      render();
  });
});

render();
