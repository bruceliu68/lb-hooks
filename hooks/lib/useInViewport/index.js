"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

require("intersection-observer");

var _dom = require("../utils/dom");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function isInViewPort(el) {
  if (!el) return false;
  var viewPortWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  var viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  var rect = el.getBoundingClientRect();

  if (rect) {
    var top = rect.top,
        bottom = rect.bottom,
        left = rect.left,
        right = rect.right;
    return bottom > 0 && top <= viewPortHeight && left <= viewPortWidth && right > 0;
  }

  return false;
}

function useInViewport(target) {
  var _useState = (0, _react.useState)(function () {
    var el = (0, _dom.getTargetElement)(target);
    return isInViewPort(el);
  }),
      _useState2 = _slicedToArray(_useState, 2),
      inViewPort = _useState2[0],
      setInViewPort = _useState2[1];

  (0, _react.useEffect)(function () {
    var el = (0, _dom.getTargetElement)(target);
    if (!el) return function () {};
    var observer = new IntersectionObserver(function (entries) {
      var _iterator = _createForOfIteratorHelper(entries),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var entry = _step.value;

          if (entry.isIntersecting) {
            setInViewPort(true);
          } else {
            setInViewPort(false);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    });
    observer.observe(el);
    return function () {
      observer.disconnect();
    };
  }, [typeof target === "function" ? undefined : target]);
  return inViewPort;
}

var _default = useInViewport;
exports.default = _default;