/**
 * title: 基本用法
 * desc: 默认为 boolean 切换
 */

import React from 'react';
import useToggle from "../../useToggle";

function Demo2(): JSX.Element {
    const [state, { toggle, setLeft, setRight }] = useToggle('Hello', 'World');

    return (
        <div>
            <p>Effects：{state}</p>
            <p>
                <button type="button" onClick={() => toggle()}>
                    Toggle
                </button>
                <button type="button" onClick={() => toggle('Hello')} style={{ margin: '0 16px' }}>
                    Toggle Hello
                </button>
                <button type="button" onClick={() => toggle('World')}>
                    Toggle World
                </button>
                <button type="button" onClick={setLeft} style={{ margin: '0 16px' }}>
                    Set Hello
                </button>
                <button type="button" onClick={setRight}>
                    Set World
                </button>
            </p>
        </div>
    );
}

export default () => {
    const [state, { toggle }] = useToggle();

    return (
        <div>
            <p>
                Effects：{`${state}`}
            </p>
            <p>
                <button type="button" onClick={() => toggle()}>
                    Toggle
                </button>
                <button type="button" onClick={() => toggle(false)} style={{ margin: '0 16px' }}>
                    Toggle False
                </button>
                <button type="button" onClick={() => toggle(true)}>
                    Toggle True
                </button>
            </p>
            <Demo2 />
        </div>
    );
};