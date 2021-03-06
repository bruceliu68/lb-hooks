"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useEventEmitter;
exports.EventEmitter = void 0;

var _react = require("react");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = function EventEmitter() {
  var _this = this;

  _classCallCheck(this, EventEmitter);

  this.subscriptions = new Set();

  this.emit = function (val) {
    var _iterator = _createForOfIteratorHelper(_this.subscriptions),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var subscription = _step.value;
        subscription(val);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };

  this.useSubscription = function (callback) {
    var callbackRef = (0, _react.useRef)();
    callbackRef.current = callback;
    (0, _react.useEffect)(function () {
      function subscription(val) {
        if (callbackRef.current) {
          callbackRef.current(val);
        }
      }

      _this.subscriptions.add(subscription);

      return function () {
        _this.subscriptions.delete(subscription);
      };
    }, []);
  };
};

exports.EventEmitter = EventEmitter;

function useEventEmitter() {
  var ref = (0, _react.useRef)();

  if (!ref.current) {
    ref.current = new EventEmitter();
  }

  return ref.current;
}