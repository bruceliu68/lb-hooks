"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

function useInterval(fn, delay, options) {
  var immediate = options === null || options === void 0 ? void 0 : options.immediate;
  var timerRef = (0, _react.useRef)();
  timerRef.current = fn;
  (0, _react.useEffect)(function () {
    if (delay === undefined || delay === null) return;

    if (immediate) {
      var _timerRef$current;

      (_timerRef$current = timerRef.current) === null || _timerRef$current === void 0 ? void 0 : _timerRef$current.call(timerRef);
    }

    var timer = setInterval(function () {
      var _timerRef$current2;

      (_timerRef$current2 = timerRef.current) === null || _timerRef$current2 === void 0 ? void 0 : _timerRef$current2.call(timerRef);
    }, delay);
    return function () {
      clearInterval(timer);
    };
  }, [delay]);
}

var _default = useInterval;
exports.default = _default;