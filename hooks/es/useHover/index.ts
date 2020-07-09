import { useEffect, useRef } from "react";
import useToggle from "../useToggle";
import { BasicTarget, getTargetElement } from '../utils/dom';

export interface Options {
    onEnter?: () => void;
    onLeave?: () => void;
}

export default (target: BasicTarget, options?: Options): boolean => {
    const { onEnter, onLeave } = options || {};

    const onEnterRef = useRef(onEnter);
    onEnterRef.current = onEnter;

    const onLeaveRef = useRef(onLeave);
    onLeaveRef.current = onLeave;

    const [state, { toggle }] = useToggle(false);

    useEffect(() => {
        const onMouseEnter = () => {
            if (onEnterRef.current) onEnterRef.current();
            toggle(true);
        };

        const onMouseLeave = () => {
            if (onLeaveRef.current) onLeaveRef.current();
            toggle(false);
        }

        const el = getTargetElement(target);

        if (el) {
            el.addEventListener("mouseenter", onMouseEnter);
            el.addEventListener("mouseleave", onMouseLeave);
            return () => {
                el.removeEventListener("mouseenter", onMouseEnter);
                el.removeEventListener("mouseleave", onMouseLeave);
            }
        }
    }, [typeof target === "function" ? undefined : target]);

    return state;
}