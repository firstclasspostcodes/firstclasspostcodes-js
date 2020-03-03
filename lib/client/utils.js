const debug = require('debug');

const PACKAGE_NAME = 'firstclasspostcodes';

module.exports = {
  debug: debug(PACKAGE_NAME),

  on(eventName, handler) {
    const { $handlers = {} } = this;
    if (!$handlers[eventName]) {
      $handlers[eventName] = [];
    }
    $handlers[eventName].push(handler);
    this.$handlers = $handlers;
    return handler;
  },

  off(eventName, handler) {
    const { $handlers } = this;
    if (!($handlers && $handlers[eventName])) {
      return false;
    }
    $handlers[eventName] = $handlers[eventName].filter((handle) => handle !== handler);
    return true;
  },

  once(eventName, handler) {
    return this.on(eventName, (...args) => {
      this.off(eventName, handler);
      return handler(...args);
    });
  },

  emit(eventName, ...args) {
    const { $handlers } = this;
    if (!$handlers || !$handlers[eventName]) {
      return false;
    }
    $handlers[eventName].forEach((handler) => handler.apply(this, args));
    return $handlers[eventName];
  },
};
