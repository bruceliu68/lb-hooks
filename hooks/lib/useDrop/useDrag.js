"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var useDrag = function useDrag() {
  var getProps = function getProps(data) {
    return {
      key: JSON.stringify(data),
      draggable: "true",
      onDragStart: function onDragStart(e) {
        e.dataTransfer.setData("custom", JSON.stringify(data));
      }
    };
  };

  return getProps;
};

var _default = useDrag;
exports.default = _default;