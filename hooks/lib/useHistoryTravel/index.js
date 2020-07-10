"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useHistoryTravel;

var _react = require("react");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var dumpIndex = function dumpIndex(step, arr) {
  var index = step > 0 ? step - 1 // move forward
  : arr.length + step; // move backward

  if (index >= arr.length - 1) {
    index = arr.length - 1;
  }

  if (index < 0) {
    index = 0;
  }

  return index;
};

var split = function split(step, targetArr) {
  var index = dumpIndex(step, targetArr);
  return {
    _current: targetArr[index],
    _before: targetArr.slice(0, index),
    _after: targetArr.slice(index + 1)
  };
};

function useHistoryTravel(initialValue) {
  var _useState = (0, _react.useState)({
    present: initialValue,
    past: [],
    future: []
  }),
      _useState2 = _slicedToArray(_useState, 2),
      history = _useState2[0],
      setHistory = _useState2[1];

  var present = history.present,
      past = history.past,
      future = history.future;
  var updateValue = (0, _react.useCallback)(function (val) {
    setHistory({
      present: val,
      future: [],
      past: [].concat(_toConsumableArray(past), [present])
    });
  }, [history, setHistory]);

  var _forward = (0, _react.useCallback)(function () {
    var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    if (future.length === 0) return;

    var _split = split(step, future),
        _before = _split._before,
        _current = _split._current,
        _after = _split._after;

    setHistory({
      present: _current,
      future: _after,
      past: [].concat(_toConsumableArray(past), [present], _toConsumableArray(_before))
    });
  }, [history, setHistory]);

  var _backward = (0, _react.useCallback)(function () {
    var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;

    if (past.length === 0) {
      return;
    }

    var _split2 = split(step, past),
        _before = _split2._before,
        _current = _split2._current,
        _after = _split2._after;

    setHistory({
      past: _before,
      present: _current,
      future: [].concat(_toConsumableArray(_after), [present], _toConsumableArray(future))
    });
  }, [history, setHistory]);

  var go = (0, _react.useCallback)(function (step) {
    if (step === 0) {
      return;
    }

    if (step > 0) {
      return _forward(step);
    }

    _backward(step);
  }, [_backward, _forward]);
  return {
    value: present,
    setValue: updateValue,
    backLength: past.length,
    forwardLength: future.length,
    go: go,
    back: (0, _react.useCallback)(function () {
      go(-1);
    }, [go]),
    forward: (0, _react.useCallback)(function () {
      go(1);
    }, [go])
  };
}