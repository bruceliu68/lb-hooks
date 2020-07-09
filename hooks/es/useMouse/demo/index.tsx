/**
 * title: 基本用法
 * desc: 获取鼠标位置。
 */

import React from 'react';
import useMouse from "../../useMouse";

export default () => {
    const mouse = useMouse();

    return <div>Mouse Pos: {JSON.stringify(mouse)}</div>;
};