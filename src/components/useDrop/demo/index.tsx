/**
 * title: 基本用法
 * desc: 拖拽区域可以接受文件，链接，文字，和下方的 box 节点。
 */

import React from 'react';
import useDrop from '../../useDrop';
import useDrag from "../../useDrag";

export default () => {
    const getDragProps = useDrag();
    const [props, { isHovering }] = useDrop({
        onText: (text, e) => {
            console.log(e);
            alert(`'text: ${text}' dropped`);
        },
        onFiles: (files, e) => {
            console.log(e, files);
            alert(`${files.length} file dropped`);
        },
        onUri: (uri, e) => {
            console.log(e);
            alert(`uri: ${uri} dropped`);
        },
        onDom: (content: string, e) => {
            alert(`custom: ${content} dropped`);
        },
    });

    return (
        <div>
            <div style={{ border: '1px dashed #e8e8e8', padding: 16, textAlign: 'center' }} {...props}>
                {isHovering ? 'release here' : 'drop here'}
            </div>

            <div style={{ display: 'flex', marginTop: 8 }}>
                {Array.from(Array(5)).map((e, i) => (
                    <div
                        {...getDragProps(`box${i}`)}
                        style={{
                            border: '1px solid #e8e8e8',
                            padding: 16,
                            width: 80,
                            textAlign: 'center',
                            marginRight: 16,
                        }}
                    >
                        box{i}
                    </div>
                ))}
            </div>
        </div>
    );
};