/**
 * title: 基本用法
 * desc: 监听 document 的可见状态
 */

import React, { useEffect } from 'react';
import useDocumentVisibility from "../../useDocumentVisibility";

export default () => {
    const documentVisibility = useDocumentVisibility();

    useEffect(() => {
        if (documentVisibility === 'visible') {
            console.log(`Current document visibility state: ${documentVisibility}`);
        } else {
            console.log(`Current document visibility state: ${documentVisibility}`);
        }
    }, [documentVisibility]);

    return <div>Current document visibility state: {documentVisibility}</div>;
};