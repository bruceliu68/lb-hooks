import { useEffect, useRef } from 'react';
import { getTargetElement, BasicTarget } from "../utils/dom";

export type Target = BasicTarget<HTMLElement | Window>;

type Options = {
    target?: Target;
    capture?: boolean;
    once?: boolean;
    passive?: boolean;
};

function useEventListener(eventName: string, handle: Function, options?: Options) {
    const savedHandler = useRef<Function>();

    useEffect(() => {
        savedHandler.current = handle;
    }, [handle]);

    useEffect(() => {
        const targetElement = getTargetElement(options?.target);
        if (!targetElement) return;

        const isSupported = targetElement.addEventListener;
        if (!isSupported) return;

        const eventListener = (event: Event) => {
            savedHandler.current && savedHandler.current(event);
        };

        targetElement.addEventListener(eventName, eventListener, {
            capture: options?.capture,
            once: options?.once,
            passive: options?.passive
        });

        return () => {
            targetElement.removeEventListener(eventName, eventListener, {
                capture: options?.capture
            });
        }

    }, [eventName, options]);

}

export default useEventListener;

