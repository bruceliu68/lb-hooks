"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _dom = require("../utils/dom");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// 返回空对象
var noop = function noop() {};

var defaultEvents = ["keydown"]; // 修饰键

var modifierKey = {
  ctrl: function ctrl(event) {
    return event.ctrlKey;
  },
  shift: function shift(event) {
    return event.shiftKey;
  },
  alt: function alt(event) {
    return event.altKey;
  },
  meta: function meta(event) {
    return event.metaKey;
  }
}; // 键盘事件 key 别名

var aliasKeyMap = {
  esc: 'Escape',
  tab: 'Tab',
  enter: 'Enter',
  space: ' ',
  // IE11 uses key names without `Arrow` prefix for arrow keys.
  up: ['Up', 'ArrowUp'],
  left: ['Left', 'ArrowLeft'],
  right: ['Right', 'ArrowRight'],
  down: ['Down', 'ArrowDown'],
  delete: ['Backspace', 'Delete']
}; // 键盘事件 keyCode 别名

var aliasKeyCodeMap = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  delete: [8, 46]
};
/**
 * 判断对象类型
 * @param [obj: any] 参数对象
 * @returns String
 */

function isType(obj) {
  return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
}
/**
 * 判断按键是否激活
 * @param [event: KeyboardEvent]键盘事件
 * @param [keyFilter: any] 当前键
 * @returns Boolean
 */


function genFilterKey(event, keyFilter) {
  var type = isType(keyFilter); // 数字类型直接匹配事件的 keyCode

  if (type === 'number') {
    return event.keyCode === keyFilter;
  } // 字符串依次判断是否有组合键


  var genArr = keyFilter.split('.');
  var genLen = 0;

  var _iterator = _createForOfIteratorHelper(genArr),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var key = _step.value;
      // 组合键
      var genModifier = modifierKey[key]; // key 别名

      var aliasKey = aliasKeyMap[key]; // keyCode 别名

      var aliasKeyCode = aliasKeyCodeMap[key];
      /**
       * 满足以上规则
       * 1. 自定义组合键别名
       * 2. 自定义 key 别名
       * 3. 自定义 keyCode 别名
       * 4. 匹配 key 或 keyCode
       */

      if (genModifier && genModifier(event) || (aliasKey && isType(aliasKey) === 'array' ? aliasKey.includes(event.key) : aliasKey === event.key) || (aliasKeyCode && isType(aliasKeyCode) === 'array' ? aliasKeyCode.includes(event.keyCode) : aliasKeyCode === event.keyCode) || event.key.toUpperCase() === key.toUpperCase()) {
        genLen++;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return genLen === genArr.length;
}
/**
 * 键盘输入预处理方法
 * @param [keyFilter: any] 当前键
 * @returns () => Boolean
 */


function genKeyFormater(keyFilter) {
  var type = isType(keyFilter);

  if (type === 'function') {
    return keyFilter;
  }

  if (type === 'string' || type === 'number') {
    return function (event) {
      return genFilterKey(event, keyFilter);
    };
  }

  if (type === 'array') {
    return function (event) {
      return keyFilter.some(function (item) {
        return genFilterKey(event, item);
      });
    };
  }

  return keyFilter ? function () {
    return true;
  } : function () {
    return false;
  };
}

function useKeyPress(keyFilter) {
  var eventHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var _option$events = option.events,
      events = _option$events === void 0 ? defaultEvents : _option$events,
      target = option.target;
  var callbackRef = (0, _react.useRef)(eventHandler);
  callbackRef.current = eventHandler;
  var callbackHandler = (0, _react.useCallback)(function (event) {
    var genGuard = genKeyFormater(keyFilter);

    if (genGuard(event)) {
      return callbackRef.current(event);
    }
  }, [keyFilter]);
  (0, _react.useEffect)(function () {
    var el = (0, _dom.getTargetElement)(target);

    var _iterator2 = _createForOfIteratorHelper(events),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var eventName = _step2.value;
        el === null || el === void 0 ? void 0 : el.addEventListener(eventName, callbackHandler);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    return function () {
      var _iterator3 = _createForOfIteratorHelper(events),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var eventName = _step3.value;
          el === null || el === void 0 ? void 0 : el.removeEventListener(eventName, callbackHandler);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    };
  }, [events, callbackHandler, typeof target === "function" ? undefined : target]);
}

var _default = useKeyPress;
exports.default = _default;