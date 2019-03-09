(function(window) {
  console.log('initialising global eventbus');
  const handlers = {};
  const state = {

  };
  const stateSubscriptions = {};
  window.eventbus = {
    updateState: (key, updaterFn) => {
      state[key] = updaterFn(state[key], state);
      const watchers = stateSubscriptions[key];
      if(!watchers) {
        return;
      }
      watchers.forEach((eventHandler) => eventHandler(state[key], state));
    },
    readState: (key, notifyFn) => {
      if(!stateSubscriptions[key]) {
        stateSubscriptions[key] = [];
      }
      stateSubscriptions[key].push(notifyFn);
    },
    getState: (key) => {
      return state[key];
    },
    publish: (event, payload) => {
      //console.log('publishing ' + event);
      const eventHandlers = handlers[event];
      if(!eventHandlers) {
        console.log('No handlers for ' + event);
        return;
      }
      eventHandlers.forEach((eventHandler) => eventHandler(payload));
    },
    subscribe: (event, handlerFn) => {
      //console.log('subscribing ' + event);
      if(!handlers[event]) {
        handlers[event] = [];
      }
      handlers[event].push(handlerFn);
    }
  };

})(window);