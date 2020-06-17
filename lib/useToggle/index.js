"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useToggle() {
  var defaultValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var reverseValue = arguments.length > 1 ? arguments[1] : undefined;

  var _useState = (0, _react.useState)(defaultValue),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var reverseValueOrigin = (0, _react.useMemo)(function () {
    return reverseValue === undefined ? !defaultValue : reverseValue;
  }, [defaultValue, reverseValue]);
  var actions = (0, _react.useMemo)(function () {
    // 切换返回值
    var toggle = function toggle(value) {
      // 强制返回状态值，适用于点击操作
      if (value !== undefined) {
        setState(value);
        return;
      }

      setState(function (s) {
        return s === defaultValue ? reverseValueOrigin : defaultValue;
      });
    }; // 设置默认值


    var setLeft = function setLeft() {
      return setState(defaultValue);
    }; // 设置取反值


    var setRight = function setRight() {
      return setState(reverseValueOrigin);
    };

    return {
      toggle: toggle,
      setLeft: setLeft,
      setRight: setRight
    };
  }, [defaultValue, reverseValueOrigin]);
  return [state, actions];
}

var _default = useToggle;
exports.default = _default;