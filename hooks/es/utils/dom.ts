import { MutableRefObject } from 'react';

export type BasicTarget<T = HTMLElement> =
    | (() => T | null)
    | T
    | null
    | MutableRefObject<T | undefined>;

type TargetElement = HTMLElement | Document | Window | null | undefined;

export function getTargetElement(
    target?: BasicTarget<TargetElement>,
): TargetElement {
    if (!target) {
        return window;
    }

    let targetElement: TargetElement;

    if (typeof target === 'function') {
        targetElement = target();
    } else if ('current' in target) {
        targetElement = target.current;
    } else {
        targetElement = target;
    }

    return targetElement;
}