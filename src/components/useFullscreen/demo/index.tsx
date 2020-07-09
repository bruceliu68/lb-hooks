/**
 * title: 基本用法
 * desc: 使用 ref 设置需要全屏的元素
 */

import React, { useRef } from 'react';
import useFullscreen from "../../useFullscreen";

import img from './react-hooks.jpg';

function Demo2(): JSX.Element {
    const [, { setFull }] = useFullscreen(() => document.getElementById('fullscreen-img'));
    return (
        <div style={{ background: 'white' }}>
            <div style={{ marginBottom: 16 }}>
                <img id="fullscreen-img" src={img} style={{ width: 320 }} alt="" />
            </div>
            <button type="button" onClick={setFull}>
                setFull
            </button>
        </div>
    );
}

export default () => {
    const ref = useRef<any>();
    const [isFullscreen, { setFull, exitFull, toggleFull }] = useFullscreen(ref);

    return (
        <>
            <div ref={ref} style={{ background: 'white' }}>
                <div style={{ marginBottom: 16 }}>{isFullscreen ? 'Fullscreen' : 'Not fullscreen'}</div>
                <div>
                    <button type="button" onClick={setFull}>
                        setFull
                    </button>
                    <button type="button" onClick={exitFull}>
                        exitFull
                    </button>
                    <button type="button" onClick={toggleFull}>
                        toggle
                    </button>
                </div>
            </div>
            <p>demo2</p>
            <Demo2 />
        </>
    );
};