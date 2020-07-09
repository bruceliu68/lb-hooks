/**
 * title: 基本用法
 * desc: 使用 ref 设置需要需要监听的元素。
 */

import React, { useRef } from 'react';
import useHover from "../../useHover";

function Demo2(): JSX.Element {
    const isHovering = useHover(() => document.getElementById('hover-div'), {
        onEnter: () => {
            console.log('onEnter');
        },
        onLeave: () => {
            console.log('onLeave');
        },
    });

    return <div id="hover-div">{isHovering ? 'hover' : 'leaveHover'}</div>;
}

export default () => {
    const ref = useRef<any>();
    const isHovering = useHover(ref);

    return (
        <>
            <div ref={ref}>{isHovering ? 'hover' : 'leaveHover'}</div>
            <p>demo2</p>
            <Demo2 />
        </>
    );
};