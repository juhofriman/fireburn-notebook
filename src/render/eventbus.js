(function(window) {
  console.log('initialising global eventbus');
  const handlers = {};
  window.eventbus = {
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