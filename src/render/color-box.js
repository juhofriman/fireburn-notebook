
let data = null;

var content = document.getElementById('color-box');

function render() {
  content.style = 'background-color: #' + data;
}

window.eventbus.subscribe('RANDOM_SEED', (payload) => {
  data =  Math.floor(payload * 16777215).toString(16) ;
  render();
});

render();