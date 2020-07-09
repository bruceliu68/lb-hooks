"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _dom = require("../utils/dom");

function useEventListener(eventName, handle, options) {
  var savedHandler = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    savedHandler.current = handle;
  }, [handle]);
  (0, _react.useEffect)(function () {
    var targetElement = (0, _dom.getTargetElement)(options === null || options === void 0 ? void 0 : options.target);
    if (!targetElement) return;
    var isSupported = targetElement.addEventListener;
    if (!isSupported) return;

    var eventListener = function eventListener(event) {
      savedHandler.current && savedHandler.current(event);
    };

    targetElement.addEventListener(eventName, eventListener, {
      capture: options === null || options === void 0 ? void 0 : options.capture,
      once: options === null || options === void 0 ? void 0 : options.once,
      passive: options === null || options === void 0 ? void 0 : options.passive
    });
    return function () {
      targetElement.removeEventListener(eventName, eventListener, {
        capture: options === null || options === void 0 ? void 0 : options.capture
      });
    };
  }, [eventName, options]);
}

var _default = useEventListener;
exports.default = _default;