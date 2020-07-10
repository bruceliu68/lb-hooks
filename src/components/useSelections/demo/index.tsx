/**
 * title: 基本用法
 * desc: 常见的 checkbox 联动
 */

import React from 'react';
import useSelections from "../../useSelections";

const list = [1, 2, 3, 4, 5, 6, 7, 8];

export default () => {

    const {
        selected,
        allSelected,
        isSelected,
        toggle,
        toggleAll,
    } = useSelections(list, [1]);

    return (
        <div>
            <div>Selected : {selected.join(',')}</div>
            <div style={{ borderBottom: '1px solid #E9E9E9', padding: '10px 0' }}>
                <input type="checkbox" checked={allSelected} onClick={toggleAll} />
            </div>
            <div style={{ padding: '10px 0' }}>
                {list.map((o) => (
                    <div key={o}>
                        <input type="checkbox" checked={isSelected(o)} onClick={() => toggle(o)} />{o}
                    </div>
                ))}
            </div>
        </div>
    );
};