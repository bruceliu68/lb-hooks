import { useCallback, useRef, useState } from 'react';

export default <T>(initialValue: T[]) => {

    const counterRef = useRef(-1);
    const keyList = useRef<number[]>([]);

    const setKey = useCallback((index: number) => {
        counterRef.current += 1;
        keyList.current.splice(index, 0, counterRef.current);
    }, []);

    const [list, setList] = useState(() => {
        (initialValue || []).forEach((_, index) => {
            setKey(index);
        });
        return initialValue || [];
    });

    // 重新设置 list 的值
    const resetList = (newList: T[] = []) => {
        keyList.current = [];
        counterRef.current = -1;
        setList(() => {
            (newList || []).forEach((_, index) => {
                setKey(index);
            });
            return newList || [];
        });
    }

    // 在指定位置插入元素
    const insert = (index: number, obj: T) => {
        setList((l) => {
            const temp = [...l];
            temp.splice(index, 0, obj);
            setKey(index);
            return temp;
        });
    }

    // 获得某个元素的 uuid
    const getKey = (index: number) => {
        return keyList.current[index];
    }

    // 获得某个key的 index
    const getIndex = (index: number) => {
        return keyList.current.findIndex(ele => ele === index);
    }

    // 在指定位置插入多个元素
    const merge = (index: number, obj: T[]) => {
        setList((l) => {
            const temp = [...l];
            obj.forEach((_, i) => {
                setKey(i);
            });
            temp.splice(index, 0, ...obj);
            return temp;
        });
    }

    // 替换指定元素
    const replace = (index: number, obj: T) => {
        setList((l) => {
            const temp = [...l];
            temp[index] = obj;
            return temp;
        });
    }

    // 删除指定元素
    const remove = (index: number) => {
        setList((l) => {
            const temp = [...l];
            temp.splice(index, 1);

            // remove keys if necessary
            try {
                keyList.current.splice(index, 1);
            } catch (e) {
                console.log(e);
            }
            return temp;
        });
    }

    // 在列表末尾添加元素
    const push = (obj: T) => {
        setList((l) => {
            setKey(l.length);
            return l.concat([obj]);
        });
    }

    // 移除末尾元素
    const pop = () => {
        // remove keys if necessary
        try {
            keyList.current = keyList.current.slice(0, keyList.current.length - 1);
        } catch (e) {
            console.log(e);
        }
        setList((l) => {
            return l.slice(0, l.length - 1);
        });
    }

    // 在列表起始位置添加元素
    const unshift = (obj: T) => {
        setList((l) => {
            setKey(0);
            return [obj].concat(l);
        });
    }

    // 移除起始位置元素
    const shift = () => {
        // remove keys if necessary
        try {
            keyList.current = keyList.current.slice(1, keyList.current.length);
        } catch (e) {
            console.log(e);
        }
        setList((l) => {
            return l.slice(1, l.length);
        });
    }

    return {
        list,
        insert,
        merge,
        replace,
        remove,
        getKey,
        getIndex,
        push,
        pop,
        unshift,
        shift,
        resetList,
    };
}