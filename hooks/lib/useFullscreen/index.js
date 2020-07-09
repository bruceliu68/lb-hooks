"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _screenfull = _interopRequireDefault(require("screenfull"));

var _useToggle3 = _interopRequireDefault(require("../useToggle"));

var _dom = require("../utils/dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _default = function _default(target, options) {
  var _ref = options || {},
      onExitFull = _ref.onExitFull,
      onFull = _ref.onFull;

  var onExitFullRef = (0, _react.useRef)(onExitFull);
  onExitFullRef.current = onExitFull;
  var onFullRef = (0, _react.useRef)(onFull);
  onFullRef.current = onFull;

  var _useToggle = (0, _useToggle3.default)(false),
      _useToggle2 = _slicedToArray(_useToggle, 2),
      state = _useToggle2[0],
      toggle = _useToggle2[1].toggle;

  (0, _react.useLayoutEffect)(function () {
    // 非全屏时，不需要监听任何全屏事件
    if (!state) return;
    var el = (0, _dom.getTargetElement)(target);
    if (!el) return; // 监听退出

    var onChange = function onChange() {
      if (_screenfull.default.isEnabled) {
        var isFullscreen = _screenfull.default.isFullscreen;
        toggle(isFullscreen);
      }
    };

    if (_screenfull.default.isEnabled) {
      try {
        _screenfull.default.request(el);

        toggle(true);

        if (onFullRef.current) {
          onFullRef.current();
        }
      } catch (error) {
        toggle(false);

        if (onExitFullRef.current) {
          onExitFullRef.current();
        }
      }

      _screenfull.default.on("change", onChange);
    } // state 从true变为false,则关闭全屏


    return function () {
      if (_screenfull.default.isEnabled) {
        try {
          _screenfull.default.off("change", onChange);

          _screenfull.default.exit();
        } catch (error) {}
      }

      if (onExitFullRef.current) {
        onExitFullRef.current();
      }
    };
  }, [state, typeof target === "function" ? undefined : target]);
  return [!!state, {
    setFull: function setFull() {
      return toggle(true);
    },
    exitFull: function exitFull() {
      return toggle(false);
    },
    toggleFull: function toggleFull() {
      return toggle();
    }
  }];
};

exports.default = _default;