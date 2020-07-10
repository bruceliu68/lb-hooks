"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useSelections;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useSelections(items) {
  var defaultSelected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var _useState = (0, _react.useState)(defaultSelected),
      _useState2 = _slicedToArray(_useState, 2),
      selected = _useState2[0],
      setSelected = _useState2[1];

  var _useMemo = (0, _react.useMemo)(function () {
    var selectedSet = new Set(selected);

    var isSelected = function isSelected(item) {
      return selectedSet.has(item);
    };

    var select = function select(item) {
      selectedSet.add(item);
      return setSelected(Array.from(selectedSet));
    };

    var unSelect = function unSelect(item) {
      selectedSet.delete(item);
      return setSelected(Array.from(selectedSet));
    };

    var toggle = function toggle(item) {
      if (isSelected(item)) {
        unSelect(item);
      } else {
        select(item);
      }
    };

    return {
      selectedSet: selectedSet,
      isSelected: isSelected,
      select: select,
      unSelect: unSelect,
      toggle: toggle
    };
  }, [selected]),
      selectedSet = _useMemo.selectedSet,
      isSelected = _useMemo.isSelected,
      select = _useMemo.select,
      unSelect = _useMemo.unSelect,
      toggle = _useMemo.toggle;

  var _useMemo2 = (0, _react.useMemo)(function () {
    var selectAll = function selectAll() {
      items.forEach(function (o) {
        selectedSet.add(o);
      });
      setSelected(Array.from(selectedSet));
    };

    var unSelectAll = function unSelectAll() {
      items.forEach(function (o) {
        selectedSet.delete(o);
      });
      setSelected(Array.from(selectedSet));
    };

    var noneSelected = items.every(function (o) {
      return !selectedSet.has(o);
    });
    var allSelected = items.every(function (o) {
      return selectedSet.has(o);
    }) && !noneSelected; // const partiallySelected = !noneSelected && !allSelected;

    var toggleAll = function toggleAll() {
      return allSelected ? unSelectAll() : selectAll();
    };

    return {
      selectAll: selectAll,
      unSelectAll: unSelectAll,
      noneSelected: noneSelected,
      allSelected: allSelected,
      // partiallySelected, 
      toggleAll: toggleAll
    };
  }, [selectedSet, items]),
      selectAll = _useMemo2.selectAll,
      unSelectAll = _useMemo2.unSelectAll,
      noneSelected = _useMemo2.noneSelected,
      allSelected = _useMemo2.allSelected,
      toggleAll = _useMemo2.toggleAll;

  return {
    selected: selected,
    isSelected: isSelected,
    select: select,
    unSelect: unSelect,
    toggle: toggle,
    selectAll: selectAll,
    unSelectAll: unSelectAll,
    toggleAll: toggleAll,
    allSelected: allSelected,
    noneSelected: noneSelected,
    // partiallySelected,
    setSelected: setSelected
  };
}