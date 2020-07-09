"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash.debounce"));

var _react = require("react");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useDebounceFn(fn, options) {
  var _options$wait;

  var fnRef = (0, _react.useRef)(fn);
  fnRef.current = fn;
  var wait = (_options$wait = options === null || options === void 0 ? void 0 : options.wait) !== null && _options$wait !== void 0 ? _options$wait : 1000;
  var debounced = (0, _.useCreation)(function () {
    return (0, _lodash.default)(function () {
      fnRef.current.apply(fnRef, arguments);
    }, wait, options);
  }, []);
  return {
    run: debounced,
    cancel: debounced.cancel
  };
}

var _default = useDebounceFn;
exports.default = _default;