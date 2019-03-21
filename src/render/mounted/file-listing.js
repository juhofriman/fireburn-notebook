var content = document.getElementById('file-listing');

function openFile(file) {
  console.log('Opening file: ' + file);
  window.eventbus.publish('OPEN_FILE', file);
}

function render(data, openedFile) {
  console.log('render');
  if(!data) { return; }
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
  data.forEach((file, index) => {
    var message = document.createElement('li');

    message.innerHTML = file;
    if(file === openedFile) {
      message.className = 'pure-menu-item currently-opened-file';
    } else {
      message.className = 'pure-menu-item';
    }
    content.appendChild(message);
  });
}

window.eventbus.readState('FILE_LISTING', (fileListing, state) => {
    if(!state.currentFile) {
      window.eventbus.updateState('currentFile', () => fileListing[0]);
    } else {
      render(fileListing, state.currentFile);
    }
});

window.eventbus.readState('currentFile', (currentFile, state) => {
    render(state.FILE_LISTING, currentFile);
});

window.eventbus.subscribe('OPEN_NEXT', () => {
  window.eventbus.updateState('currentFile', (currentFile, state) => {
    var current = state.FILE_LISTING.findIndex(file => file === currentFile);
    var next = current + 1;
    if(next === state.FILE_LISTING.length) {
      next = 0;
    }
    return state.FILE_LISTING[next];
  });
});

window.eventbus.subscribe('OPEN_PREV', () => {
  window.eventbus.updateState('currentFile', (currentFile, state) => {
    var current = state.FILE_LISTING.findIndex(file => file === currentFile);
    var next = current - 1;
    if(next === -1) {
      next = state.FILE_LISTING.length - 1;
    }
    return state.FILE_LISTING[next];
  });
});

render();