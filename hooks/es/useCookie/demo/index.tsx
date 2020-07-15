/**
 * title: 基本用法
 * desc: 设置cookie
 */

import React, { useState } from 'react';
import useCookie from "../../useCookie";

export default () => {
    const [value, updateCookie, deleteCookie] = useCookie("my-cookie");
    const [counter, setCounter] = useState(1);

    const updateCookieHandler = () => {
        updateCookie(`my-awesome-cookie-${counter}`);
        setCounter(c => c + 1);
    };

    return (
        <div>
            <p>Value: {value}</p>
            <button onClick={updateCookieHandler}>Update Cookie</button>
            <br />
            <button onClick={deleteCookie}>Delete Cookie</button>
        </div>
    );
};