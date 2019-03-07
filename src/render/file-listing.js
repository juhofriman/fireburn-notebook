
let data = [];

var content = document.getElementById('file-listing');

function openFile(file) {
  console.log('Opening file: ' + file);
  window.eventbus.publish('OPEN_FILE', file);
}

function render() {
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
  data.forEach(file => {
    var message = document.createElement('div');
    message.innerHTML = file;
    message.onclick = () => openFile(file);
    content.appendChild(message);
  });

}

window.eventbus.subscribe('FILES_CHANGED', (payload) => {
  console.log('Received new file listing');
  data = payload;
  render();
});

render();