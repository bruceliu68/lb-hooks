"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _useSize = _interopRequireDefault(require("../useSize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _default = function _default(list, options) {
  var containerRef = (0, _react.useRef)();
  var size = (0, _useSize.default)(containerRef); // 暂时禁止 cache
  // const distanceCache = useRef<{ [key: number]: number }>({});

  var _useState = (0, _react.useState)({
    start: 0,
    end: 10
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var itemHeight = options.itemHeight,
      _options$overscan = options.overscan,
      overscan = _options$overscan === void 0 ? 5 : _options$overscan;

  if (!itemHeight) {
    console.warn('please enter a valid itemHeight');
  }

  var getViewCapacity = function getViewCapacity(containerHeight) {
    if (typeof itemHeight === 'number') {
      return Math.ceil(containerHeight / itemHeight);
    }

    var _state$start = state.start,
        start = _state$start === void 0 ? 0 : _state$start;
    var sum = 0;
    var capacity = 0;

    for (var i = start; i < list.length; i++) {
      var height = itemHeight(i);
      sum += height;

      if (sum >= containerHeight) {
        capacity = i;
        break;
      }
    }

    return capacity - start;
  };

  var getOffset = function getOffset(scrollTop) {
    if (typeof itemHeight === 'number') {
      return Math.floor(scrollTop / itemHeight) + 1;
    }

    var sum = 0;
    var offset = 0;

    for (var i = 0; i < list.length; i++) {
      var height = itemHeight(i);
      sum += height;

      if (sum >= scrollTop) {
        offset = i;
        break;
      }
    }

    return offset + 1;
  };

  var calculateRange = function calculateRange() {
    var element = containerRef.current;

    if (element) {
      var offset = getOffset(element.scrollTop);
      var viewCapacity = getViewCapacity(element.clientHeight);
      var from = offset - overscan;
      var to = offset + viewCapacity + overscan;
      setState({
        start: from < 0 ? 0 : from,
        end: to > list.length ? list.length : to
      });
    }
  };

  (0, _react.useEffect)(function () {
    calculateRange();
  }, [size.width, size.height]);
  var totalHeight = (0, _react.useMemo)(function () {
    if (typeof itemHeight === 'number') {
      return list.length * itemHeight;
    }

    return list.reduce(function (sum, _, index) {
      return sum + itemHeight(index);
    }, 0);
  }, [list.length]);

  var getDistanceTop = function getDistanceTop(index) {
    // 如果有缓存，优先返回缓存值
    // if (enableCache && distanceCache.current[index]) {
    //   return distanceCache.current[index];
    // }
    if (typeof itemHeight === 'number') {
      var _height = index * itemHeight; // if (enableCache) {
      //   distanceCache.current[index] = height;
      // }


      return _height;
    }

    var height = list.slice(0, index).reduce(function (sum, _, i) {
      return sum + itemHeight(i);
    }, 0); // if (enableCache) {
    //   distanceCache.current[index] = height;
    // }

    return height;
  };

  var scrollTo = function scrollTo(index) {
    if (containerRef.current) {
      containerRef.current.scrollTop = getDistanceTop(index);
      calculateRange();
    }
  };

  return {
    list: list.slice(state.start, state.end).map(function (ele, index) {
      return {
        data: ele,
        index: index + state.start
      };
    }),
    scrollTo: scrollTo,
    containerProps: {
      ref: function ref(ele) {
        // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31065
        containerRef.current = ele;
      },
      onScroll: function onScroll(e) {
        e.preventDefault();
        calculateRange();
      },
      style: {
        overflowY: 'auto'
      }
    },
    wrapperProps: {
      style: {
        width: '100%',
        height: totalHeight,
        boxSizing: 'border-box',
        paddingTop: getDistanceTop(state.start)
      }
    }
  };
};

exports.default = _default;