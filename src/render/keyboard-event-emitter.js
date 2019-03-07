
window.addEventListener('keypress', (event) => {
  switch(event.key) {
    case 's': window.eventbus.publish('OPEN_NEXT'); return;
    case 'a': window.eventbus.publish('OPEN_PREV'); return;
  }
}, true)