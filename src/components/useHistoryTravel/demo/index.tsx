/**
 * title: 基础使用
 * desc: 撤销跟重做操作。
 */

import React, { useState } from 'react';
import useHistoryTravel from "../../useHistoryTravel";

export default () => {
    const { value, setValue, backLength, forwardLength, back, forward, go } = useHistoryTravel([
        'do homework',
    ]);

    const [inputValue, setInputValue] = useState('');
    const [step, setStep] = useState(0);

    const onAdd = () => {
        setValue([...value, inputValue]);
        setInputValue('');
    };

    const onGo = () => {
        go(step);
        setStep(0);
    };

    console.log(value);

    return (
        <div>
            <div style={{ border: '1px solid black', padding: 16, margin: '16px 0' }}>
                <h3>TODO List</h3>
                {value}
            </div>
            <div style={{ marginBottom: 20 }}>
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Please enter TODO name"
                    style={{ width: 200, marginRight: 20 }}
                />
                <button type="button" onClick={onAdd} style={{ marginRight: 20 }}>
                    {' '}
                    Add TODO{''}
                </button>
                <button type="button" disabled={backLength <= 0} onClick={back} style={{ marginRight: 20 }}>
                    {' '}
                    Undo{' '}
                </button>
                <button type="button" disabled={forwardLength <= 0} onClick={forward}>
                    {' '}
                    Redo{' '}
                </button>
            </div>
            <div>
                <input
                    type="number"
                    value={step}
                    onChange={(e) => setStep(e.target.value as any)}
                    max={forwardLength}
                    min={backLength * -1}
                    style={{ marginRight: 20, width: 60 }}
                />
                <button type="button" onClick={onGo}>
                    Go
                </button>
            </div>
        </div>
    );
};