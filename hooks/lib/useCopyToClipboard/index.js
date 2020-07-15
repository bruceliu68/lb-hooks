"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _copyToClipboard = _interopRequireDefault(require("copy-to-clipboard"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useCopyToClipboard = function useCopyToClipboard() {
  var _useState = (0, _react.useState)({
    value: undefined,
    error: undefined,
    isCopy: false
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var copyToClipboard = (0, _react.useCallback)(function (value) {
    var normalizedValue;

    try {
      // only strings and numbers casted to strings can be copied to clipboard
      if (typeof value !== 'string' && typeof value !== 'number') {
        var error = new Error("Cannot copy typeof ".concat(_typeof(value), " to clipboard, must be a string"));
        if (process.env.NODE_ENV === 'development') console.error(error);
        setState({
          value: undefined,
          error: error,
          isCopy: false
        });
        return;
      } // empty strings are also considered invalid
      else if (value === '') {
          var _error = new Error("Cannot copy empty string to clipboard.");

          if (process.env.NODE_ENV === 'development') console.error(_error);
          setState({
            value: undefined,
            error: _error,
            isCopy: false
          });
          return;
        }

      if (typeof value === 'number') {
        normalizedValue = "".concat(value);
      } else {
        normalizedValue = value.toString();
      }

      var isCopyFlag = (0, _copyToClipboard.default)(normalizedValue);
      setState({
        value: normalizedValue,
        error: undefined,
        isCopy: isCopyFlag
      });
    } catch (error) {
      setState({
        value: undefined,
        error: error,
        isCopy: false
      });
    }
  }, []);
  return [state, copyToClipboard];
};

var _default = useCopyToClipboard;
exports.default = _default;