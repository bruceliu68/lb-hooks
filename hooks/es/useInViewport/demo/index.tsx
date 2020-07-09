/**
 * title: 基本用法
 * desc: 使用 ref 监听节点在视图变化或者滚动时是否在可视范围之内
 */

import React, { useRef } from 'react';
import useInViewport from "../../useInViewport";

function Demo2(): JSX.Element {
    const inViewPort = useInViewport(() => document.querySelector('#demo2'));
    return (
        <div>
            <div id="demo2">observer dom</div>
            <div style={{ marginTop: 70, color: inViewPort ? '#87d068' : '#f50' }}>
                {inViewPort ? 'visible' : 'hidden'}
            </div>
        </div>
    );
}

export default () => {
    const ref = useRef<any>();
    const inViewPort = useInViewport(ref);

    return (
        <>
            <div>
                <div ref={ref}>observer dom</div>
                <div style={{ marginTop: 70, color: inViewPort ? '#87d068' : '#f50' }}>
                    {inViewPort ? 'visible' : 'hidden'}
                </div>
            </div>
            <p>demo2</p>
            <Demo2 />
        </>
    );
};