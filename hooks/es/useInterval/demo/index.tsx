/**
 * title: 基本用法
 * desc: 每1000ms，执行一次
 */

import React, { useState } from 'react';
import useInterval from "../../useInterval";

// 立即执行定时器的重启、间隔时间增加、清除的使用。
function Demo2(): JSX.Element {
    const [count, setCount] = useState(0);
    const [interval, setInterval] = useState<any>(1000);

    useInterval(
        () => {
            setCount(count + 1);
        },
        interval,
        { immediate: true },
    );

    return (
        <div>
            <p style={{ marginTop: 16 }}> count: {count} </p>
            <p style={{ marginTop: 16 }}> interval: {interval} </p>
            <button onClick={() => setInterval(interval + 1000)} style={{ marginRight: 12 }}>
                interval + 1000
            </button>
            <button
                style={{ marginRight: 12 }}
                onClick={() => {
                    setInterval(1000);
                }}
            >
                reset interval
             </button>
            <button
                onClick={() => {
                    setInterval(null);
                }}
            >
                clear
            </button>
        </div>
    );

}

export default () => {
    const [count, setCount] = useState(0);

    useInterval(() => {
        setCount(count + 1);
    }, 1000);

    return (
        <>
            <div>
                <p style={{ marginTop: 16 }}> count: {count} </p>
            </div>
            <Demo2 />
        </>
    );
};