/**
 * title: 基本用法
 * desc: 复制元素到剪切板
 */

import React from 'react';
import useCopyToClipboard from "../../useCopyToClipboard";

export default () => {
    const [text, setText] = React.useState('');
    const [state, copyToClipboard] = useCopyToClipboard();

    return (
        <div>
            <input value={text} onChange={e => setText(e.target.value)} />
            <button type="button" onClick={() => copyToClipboard(text)}>copy text</button>
            {state.error
                ? <p>Unable to copy value: {state.error.message}</p>
                : state.value && <p>Copied {state.value}</p>}
        </div>
    );
};