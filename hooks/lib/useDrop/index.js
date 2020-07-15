"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

var getProps = function getProps(callback, setIsHovering) {
  return {
    onDragOver: function onDragOver(event) {
      event.preventDefault();
    },
    onDragEnter: function onDragEnter(event) {
      event.preventDefault();
      setIsHovering(true);
    },
    onDragLeave: function onDragLeave() {
      setIsHovering(false);
    },
    onDrop: function onDrop(event) {
      event.preventDefault();
      event.persist();
      setIsHovering(false);
      callback(event.dataTransfer, event);
    },
    onPaste: function onPaste(event) {
      event.persist();
      callback(event.clipboardData, event);
    }
  };
};

var useDrop = function useDrop() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var optionsRef = (0, _react.useRef)(options);
  optionsRef.current = options;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isHovering = _useState2[0],
      setIsHovering = _useState2[1];

  var callback = (0, _react.useCallback)(function (dataTransfer, event) {
    var uri = dataTransfer.getData("text/uri-list");
    var dom = dataTransfer.getData("custom");

    if (dom && optionsRef.current.onDom) {
      optionsRef.current.onDom(JSON.parse(dom), event);
      return;
    }

    if (uri && optionsRef.current.onUri) {
      optionsRef.current.onUri(uri, event);
      return;
    }

    if (dataTransfer.files && dataTransfer.files.length && optionsRef.current.onFiles) {
      optionsRef.current.onFiles(_toConsumableArray(dataTransfer.files), event);
      return;
    }

    if (dataTransfer.items && dataTransfer.items.length && optionsRef.current.onText) {
      dataTransfer.items[0].getAsString(function (text) {
        optionsRef.current.onText(text, event);
      });
    }
  }, []);
  var props = (0, _react.useMemo)(function () {
    return getProps(callback, setIsHovering);
  }, [callback, setIsHovering]);
  return [props, {
    isHovering: isHovering
  }];
};

var _default = useDrop;
exports.default = _default;