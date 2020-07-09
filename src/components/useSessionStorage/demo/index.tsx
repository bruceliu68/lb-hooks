/**
 * title: 基本用法
 * desc: 一个可以将状态持久化存储在 sessionStorage 中的 Hook
 */

import React from 'react';
import useSessionStorage from "../../useSessionStorage";

const defaultArray = ['a', 'e', 'i', 'o', 'u'];

function Demo2(): JSX.Element {
    const [value, setValue] = useSessionStorage('cascader', defaultArray);
    return (
        <>
            <p>{value.join('-')}</p>
            <button
                type="button"
                style={{ marginRight: '16px' }}
                onClick={() => setValue([...value, Math.random().toString(36).slice(-1)])}
            >
                push random
        </button>
            <button type="button" onClick={() => setValue(defaultArray)}>
                reset
        </button>
        </>
    );
}

function Demo3(): JSX.Element {
    const [user, setUser] = useSessionStorage('user', {
        id: 9234634791,
        name: 'Zhangsan',
        age: 33,
    });
    return (
        <>
            <input
                style={{ width: 200 }}
                defaultValue={user.name}
                placeholder="input user name"
                onChange={(e) => {
                    setUser({ ...user, name: e.target.value });
                }}
            />
        </>
    );
}

export default () => {
    const [message, setMessage] = useSessionStorage('user-message', 'Hello~');

    return (
        <>
            <input
                value={message || ''}
                placeholder="Please enter some words..."
                onChange={(e) => setMessage(e.target.value)}
            />
            <button style={{ margin: '0 16px' }} type="button" onClick={() => setMessage('Hello~')}>
                Reset
            </button>
            <button type="button" onClick={() => setMessage()}>
                Clear
            </button>
            <p>demo2</p>
            <Demo2 />
            <p>Demo3</p>
            <Demo3 />
        </>
    );
};