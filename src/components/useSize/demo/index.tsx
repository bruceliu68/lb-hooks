/**
 * title: 基本用法
 * desc: 使用 ref 监听节点尺寸变化
 */

import React, { useRef } from 'react';
import useSize from "../../useSize";

function Demo2(): JSX.Element {
    const dom = document.querySelector('body');
    const size = useSize(dom);
    return (
        <div>
            try to resize the preview window <br />
            dimensions -- width: {size.width} px, height: {size.height} px
        </div>
    );
}

export default () => {
    const ref = useRef<any>();
    const size = useSize(ref);

    return (
        <>
            <div ref={ref}>
                try to resize the preview window <br />
                dimensions -- width: {size.width} px, height: {size.height} px
            </div>
            <Demo2 />
        </>
    );
};