
let data = null;

var content = document.getElementById('random-seed');

function render() {
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
  var message = document.createElement('div');
  message.innerHTML = data;
  content.appendChild(message);
}

window.eventbus.subscribe('RANDOM_SEED', (payload) => {
  data = payload;
  render();
});

render();