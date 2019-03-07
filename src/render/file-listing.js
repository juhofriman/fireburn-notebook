
let data = [];
let pointer = null;

var content = document.getElementById('file-listing');

function openFile(file) {
  console.log('Opening file: ' + file);
  window.eventbus.publish('OPEN_FILE', file);
}

function render() {
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
  data.forEach((file, index) => {
    var message = document.createElement('div');
    message.innerHTML = file;
    message.onclick = () => openFile(file);
    if(index === pointer) {
      message.style = 'font-weight: bold';
    }
    content.appendChild(message);
  });

}

window.eventbus.subscribe('FILES_CHANGED', (payload) => {
  console.log('Received new file listing');
  data = payload;
  if(payload.length > 0 && pointer === null) {
    pointer = 0;
    window.eventbus.publish('OPEN_FILE', data[pointer]);
  }
  render();
});

window.eventbus.subscribe('OPEN_NEXT', () => {
  pointer++;
  if(pointer === data.length) {
    pointer = 0;
  }
  window.eventbus.publish('OPEN_FILE', data[pointer]);
  render();
});

window.eventbus.subscribe('OPEN_PREV', () => {
  pointer--;
  if(pointer === -1) {
    pointer = data.length -1;
  }
  window.eventbus.publish('OPEN_FILE', data[pointer]);
  render();
});

render();