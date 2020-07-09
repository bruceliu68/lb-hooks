/**
 * title: 基本用法
 * desc: 支持键盘事件中的 key 和 keyCode，请按 ArrowUp 或 ArrowDown 键进行演示。
 */

import React, { useState, useRef } from 'react';
import useKeyPress from "../../useKeyPress";

// 支持使用别名，更多内容请[查看备注](#备注)。
function Demo2(): JSX.Element {
    const [counter, setCounter] = useState(0);

    useKeyPress('left', () => {
        setCounter((s) => s - 1);
    });

    useKeyPress('right', () => {
        setCounter((s) => s + 1);
    });

    return (
        <div>
            <p>Try pressing the following: </p>
            <div>1. Press ArrowLeft to decrease</div>
            <div>2. Press ArrowRight to increase</div>
            <div>
                counter: <span style={{ color: '#f00' }}>{counter}</span>
            </div>
        </div>
    );
}

// 支持接收一组输入键，或以组合键的方式传递参数。
// 请注意：组合键方式只支持使用修饰键 + 键位别名 + 键盘事件中的 key 进行组合，更多内容请[查看备注](#备注)。
function Demo3(): JSX.Element {
    const [num, setNum] = useState<string>();
    const [key, setKey] = useState<string>();
    const [state, setState] = useState<number>();
    const filterKey = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    useKeyPress(filterKey, (event) => {
        setNum(event.key);
    });

    // a s d f, Backspace, 8
    useKeyPress([65, 83, 68, 70, 8, '8'], (event) => {
        setKey(event.key);
    });

    useKeyPress(['shift.c'], () => {
        setState(1);
    });

    useKeyPress(['meta'], () => {
        setState(2);
    });

    useKeyPress('ctrl.alt.c', () => {
        setState(3);
    });

    useKeyPress('ctrl.alt.space', () => {
        setState(4);
    });

    // Attention: event.key === '0'
    useKeyPress('ctrl.alt.0', () => {
        setState(5);
    });

    return (
        <div>
            <p>Try pressing the following: </p>
            <div>
                1. Number key [0-9]: <span style={{ color: '#f00' }}>{num}</span>
            </div>
            <div>
                2. Press key [a, s, d, f, Backspace, 8]: <span style={{ color: '#f00' }}>{key}</span>
            </div>
            <div>
                3. Modifier key [shift.c]: {state === 1 && <span style={{ color: '#f00' }}>ok</span>}
            </div>
            <div>
                4. Modifier key [meta]: {state === 2 && <span style={{ color: '#f00' }}>ok</span>}
            </div>
            <div>
                5. Modifier key [ctrl.alt.c]:{' '}
                {state === 3 && <span style={{ color: '#f00' }}>ok</span>}
            </div>
            <div>
                6. Modifier key [ctrl.alt.space]:{' '}
                {state === 4 && <span style={{ color: '#f00' }}>ok</span>}
            </div>
            <div>
                7. Modifier key [ctrl.alt.0]:{' '}
                {state === 5 && <span style={{ color: '#f00' }}>ok</span>}
            </div>
        </div>
    );
}

// 支持接收一个返回 boolean 的回调函数，处理预处理操作。
function Demo4(): JSX.Element {
    const [key, setKey] = useState<string>();
    const filterKey = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    useKeyPress(
        (event) => !filterKey.includes(event.key),
        (event) => {
            if (event.type === 'keyup') {
                setKey(event.key);
            }
        },
        {
            events: ['keydown', 'keyup'],
        },
    );

    return (
        <div>
            Pressing key except number key：<span style={{ color: '#f00' }}>{key}</span>
        </div>
    );
}

// 默认监听挂载在 window 上的事件，你也可以传入 DOM 对象或通过 function 返回一个对象的方式引入。
function Demo5(): JSX.Element {
    const inputRef = useRef<any>();

    const [text, setText] = useState('');
    const [textRef, setTextRef] = useState('');
    const [textSync, setTextSync] = useState('');
    useKeyPress(
        'enter',
        (event: any) => {
            const { value } = event.target;
            setText(value);
        },
        {
            events: ['keyup'],
            target: () => document.getElementById('input'),
        },
    );

    useKeyPress(
        'enter',
        (event: any) => {
            const { value } = event.target;
            setTextRef(value);
        },
        {
            target: inputRef,
        },
    );

    // Make sure the DOM exists
    useKeyPress(
        () => true,
        (event: any) => {
            const { value } = event.target;
            setTextSync(value);
        },
        {
            events: ['keyup'],
            target: document.getElementById('input2'),
        },
    );

    return (
        <div>
            <div>
                <p>Input and pressing enter: {text}</p>
                <input id="input" style={{ width: 300, marginRight: 24 }} />
            </div>
            <div style={{ marginTop: 24 }}>
                <p>Input and pressing enter: {textRef}</p>
                <input ref={inputRef} style={{ width: 300, marginRight: 24 }} />
            </div>
            <div style={{ marginTop: 24 }}>
                <p>Input after enter change: {textSync}</p>
                <input id="input2" style={{ width: 300, marginRight: 24 }} />
            </div>
        </div>
    );
}

export default () => {
    const [counter, setCounter] = useState(0);

    useKeyPress('ArrowUp', () => {
        setCounter((s) => s + 1);
    });

    // keyCode value for ArrowDown
    useKeyPress(40, () => {
        setCounter((s) => s - 1);
    });

    return (
        <div>
            <div>
                <p>Try pressing the following: </p>
                <div>1. Press ArrowUp by key to increase</div>
                <div>2. Press ArrowDown by keyCode to decrease</div>
                <div>
                    counter: <span style={{ color: '#f00' }}>{counter}</span>
                </div>
            </div>
            <p>demo2</p>
            <Demo2 />
            <p>demo3</p>
            <Demo3 />
            <p>demo4</p>
            <Demo4 />
            <p>demo5</p>
            <Demo5 />
        </div>
    );
};