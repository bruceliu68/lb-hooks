/**
 * title: 基本用法
 * desc: 获取当前地理位置信息
 */

import React from 'react';
import useGeolocation from "../../useGeolocation";

export default () => {
    const state = useGeolocation();

    return (
        <pre>
            {JSON.stringify(state, null, 2)}
        </pre>
    );
};