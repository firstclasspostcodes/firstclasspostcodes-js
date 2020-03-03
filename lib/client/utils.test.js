const utils = require('./utils');

describe('utils', () => {
  describe('Events', () => {
    let eventName;

    let handler;

    beforeEach(() => {
      eventName = Math.random().toString();
      handler = jest.fn();
    });

    describe('#on', () => {
      it('should set a handler', () => {
        expect(utils.$handlers).toBeFalsy();
        utils.on(eventName, handler);
        expect(utils.$handlers[eventName]).toEqual(expect.arrayContaining([handler]));
      });

      it('should set two handlers', () => {
        utils.on(eventName, handler);
        utils.on(`${eventName}+2`, handler);
        expect(utils.$handlers[eventName]).toEqual(expect.arrayContaining([handler]));
      });
    });

    describe('#off', () => {
      beforeEach(() => {
        utils.on(eventName, handler);
      });

      it('should unset a handler', () => {
        utils.off(eventName, handler);
        expect(utils.$handlers[eventName]).not.toEqual(expect.arrayContaining([handler]));
      });

      it('should not unset a non-existent handler', () => (
        expect(utils.off(Math.random().toString())).toBe(false)
      ));
    });

    describe('#emit', () => {
      beforeEach(() => {
        utils.on(eventName, handler);
      });

      it('should call the function', () => {
        const obj = { a: 1 };
        utils.emit(eventName, obj);
        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledWith(obj);
      });

      it('should not call a non-existent event', () => (
        expect(utils.emit(Math.random().toString())).toBe(false)
      ));
    });

    describe('#once', () => {
      beforeEach(() => {
        utils.once(eventName, handler);
      });

      it('should call the function', () => {
        const obj = { a: 1 };
        utils.emit(eventName, obj);
        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledWith(obj);
        expect(utils.$handlers[eventName]).not.toEqual(expect.arrayContaining([handler]));
      });
    });
  });
});
