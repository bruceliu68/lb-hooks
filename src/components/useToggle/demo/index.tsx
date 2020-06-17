/**
 * title: 基本用法
 * desc: 默认为 boolean 切换，基本用法与 useBoolean 一致。
 */

import React from 'react';
import useToggle from "../../useToggle";

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
        </div>
    );
};