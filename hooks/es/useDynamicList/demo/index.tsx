/**
 * title: 基本用法
 * desc: 可增删的不定条数表单
 */

import React, { useRef } from 'react';
import useDynamicList from "../../useDynamicList";

// function Demo2(): JSX.Element {
//     const dom = document.querySelector('body');
//     const size = useSize(dom);
//     return (
//         <div>
//             try to resize the preview window <br />
//             dimensions -- width: {size.width} px, height: {size.height} px
//         </div>
//     );
// }

export default () => {
    const { list, remove, insert } = useDynamicList(['David', 'Jack']);

    return (
        <>
            <ul>
                {
                    list.map((item, index) => {
                        return (
                            <li key={index}>
                                item: {item}
                                <span onClick={() => {
                                    remove(index);
                                }}>-</span>
                                <span onClick={() => {
                                    insert(index + 1, "插入数据");
                                }}>+</span>
                            </li>
                        );
                    })
                }
            </ul>
            {/* <Demo2 /> */}
        </>
    );
};