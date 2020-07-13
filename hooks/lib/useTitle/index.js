"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var DEFAULT_OPTIONS = {
  restoreOnUnmount: false
};

function useTitle(title) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_OPTIONS;
  var titleRef = (0, _react.useRef)(document.title);
  document.title = title;
  (0, _react.useEffect)(function () {
    if (options && options.restoreOnUnmount) {
      return function () {
        document.title = titleRef.current;
      };
    }
  }, []);
}

var _default = typeof document !== "undefined" ? useTitle : function (_title) {};

exports.default = _default;