
window.addEventListener('keypress', (event) => {
  console.log(event)
  if(event.target.tagName === 'TEXTAREA' && event.ctrlKey === false) {
    return;
  }
  event.preventDefault();
  if(event.ctrlKey && event.key === 's') {
    window.eventbus.publish('SAVE'); return;
    return;
  }
  switch(event.key) {
    case 's': window.eventbus.publish('OPEN_NEXT'); return;
    case 'a': window.eventbus.publish('OPEN_PREV'); return;
    case 'e': window.eventbus.publish('TOGGLE_EDIT'); return;
  }
}, false)