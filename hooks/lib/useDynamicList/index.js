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

var _default = function _default(initialValue) {
  var counterRef = (0, _react.useRef)(-1);
  var keyList = (0, _react.useRef)([]);
  var setKey = (0, _react.useCallback)(function (index) {
    counterRef.current += 1;
    keyList.current.splice(index, 0, counterRef.current);
  }, []);

  var _useState = (0, _react.useState)(function () {
    (initialValue || []).forEach(function (_, index) {
      setKey(index);
    });
    return initialValue || [];
  }),
      _useState2 = _slicedToArray(_useState, 2),
      list = _useState2[0],
      setList = _useState2[1]; // 重新设置 list 的值


  var resetList = function resetList() {
    var newList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    keyList.current = [];
    counterRef.current = -1;
    setList(function () {
      (newList || []).forEach(function (_, index) {
        setKey(index);
      });
      return newList || [];
    });
  }; // 在指定位置插入元素


  var insert = function insert(index, obj) {
    setList(function (l) {
      var temp = _toConsumableArray(l);

      temp.splice(index, 0, obj);
      setKey(index);
      return temp;
    });
  }; // 获得某个元素的 uuid


  var getKey = function getKey(index) {
    return keyList.current[index];
  }; // 获得某个key的 index


  var getIndex = function getIndex(index) {
    return keyList.current.findIndex(function (ele) {
      return ele === index;
    });
  }; // 在指定位置插入多个元素


  var merge = function merge(index, obj) {
    setList(function (l) {
      var temp = _toConsumableArray(l);

      obj.forEach(function (_, i) {
        setKey(i);
      });
      temp.splice.apply(temp, [index, 0].concat(_toConsumableArray(obj)));
      return temp;
    });
  }; // 替换指定元素


  var replace = function replace(index, obj) {
    setList(function (l) {
      var temp = _toConsumableArray(l);

      temp[index] = obj;
      return temp;
    });
  }; // 删除指定元素


  var remove = function remove(index) {
    setList(function (l) {
      var temp = _toConsumableArray(l);

      temp.splice(index, 1); // remove keys if necessary

      try {
        keyList.current.splice(index, 1);
      } catch (e) {
        console.log(e);
      }

      return temp;
    });
  }; // 在列表末尾添加元素


  var push = function push(obj) {
    setList(function (l) {
      setKey(l.length);
      return l.concat([obj]);
    });
  }; // 移除末尾元素


  var pop = function pop() {
    // remove keys if necessary
    try {
      keyList.current = keyList.current.slice(0, keyList.current.length - 1);
    } catch (e) {
      console.log(e);
    }

    setList(function (l) {
      return l.slice(0, l.length - 1);
    });
  }; // 在列表起始位置添加元素


  var unshift = function unshift(obj) {
    setList(function (l) {
      setKey(0);
      return [obj].concat(l);
    });
  }; // 移除起始位置元素


  var shift = function shift() {
    // remove keys if necessary
    try {
      keyList.current = keyList.current.slice(1, keyList.current.length);
    } catch (e) {
      console.log(e);
    }

    setList(function (l) {
      return l.slice(1, l.length);
    });
  };

  return {
    list: list,
    insert: insert,
    merge: merge,
    replace: replace,
    remove: remove,
    getKey: getKey,
    getIndex: getIndex,
    push: push,
    pop: pop,
    unshift: unshift,
    shift: shift,
    resetList: resetList
  };
};

exports.default = _default;