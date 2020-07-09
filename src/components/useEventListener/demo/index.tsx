/**
 * title: 基本用法
 * desc: 点击按钮查看效果。
 */

import React, { useRef, useState } from 'react';
import useEventListener from "../../useEventListener";

function Demo2(): JSX.Element {
    const [value, setValue] = useState('');

    const keyDownHandler = (ev: KeyboardEvent) => {
        setValue(ev.code);
    };
    useEventListener('keydown', keyDownHandler);

    return <p>Your press key is {value}</p>;
}

export default () => {
    const [value, setValue] = useState(0);

    const clickHandler = () => {
        setValue(value + 1);
    };

    const ref = useRef<any>();
    useEventListener('click', clickHandler, { target: ref });

    return (
        <>
            <button ref={ref} type="button">
                You click {value} times
            </button>
            <h2>demo2</h2>
            <Demo2 />
        </>
    );
};