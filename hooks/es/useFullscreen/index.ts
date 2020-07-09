import { useLayoutEffect, useRef } from "react";
import screenfull from "screenfull";
import useToggle from '../useToggle';
import { BasicTarget, getTargetElement } from '../utils/dom';

export interface Options {
    onExitFull?: () => void;
    onFull?: () => void;
}

interface Callback {
    setFull: () => void;
    exitFull: () => void;
    toggleFull: () => void;
}

type Value = boolean;
type Result = [Value, Callback];

export default (target: BasicTarget, options?: Options): Result => {
    const { onExitFull, onFull } = options || {};

    const onExitFullRef = useRef(onExitFull);
    onExitFullRef.current = onExitFull;

    const onFullRef = useRef(onFull);
    onFullRef.current = onFull;

    const [state, { toggle }] = useToggle(false);

    useLayoutEffect(() => {
        // 非全屏时，不需要监听任何全屏事件
        if (!state) return;

        const el = getTargetElement(target);
        if (!el) return;

        // 监听退出
        const onChange = () => {
            if (screenfull.isEnabled) {
                const { isFullscreen } = screenfull;
                toggle(isFullscreen);
            }
        }

        if (screenfull.isEnabled) {
            try {
                screenfull.request(el as HTMLElement);
                toggle(true);
                if (onFullRef.current) {
                    onFullRef.current();
                }
            } catch (error) {
                toggle(false);
                if (onExitFullRef.current) {
                    onExitFullRef.current();
                }
            }
            screenfull.on("change", onChange);
        }

        // state 从true变为false,则关闭全屏
        return () => {
            if (screenfull.isEnabled) {
                try {
                    screenfull.off("change", onChange);
                    screenfull.exit();
                } catch (error) { }
            }
            if (onExitFullRef.current) {
                onExitFullRef.current();
            }
        }
    }, [state, typeof target === "function" ? undefined : target]);

    return [
        !!state,
        {
            setFull: () => toggle(true),
            exitFull: () => toggle(false),
            toggleFull: () => toggle()
        }
    ];

}