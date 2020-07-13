/**
 * title: 基本用法
 * desc: 设置页面标题
 */

import React, { useState } from 'react';
import useTitle from "../../useTitle";


export default () => {
    useTitle('Page Title');

    return (
        <div>
            <p>sets title of the page.</p>
        </div>
    );
};