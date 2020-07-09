"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTargetElement = getTargetElement;

function getTargetElement(target) {
  if (!target) {
    return window;
  }

  var targetElement;

  if (typeof target === 'function') {
    targetElement = target();
  } else if ('current' in target) {
    targetElement = target.current;
  } else {
    targetElement = target;
  }

  return targetElement;
}