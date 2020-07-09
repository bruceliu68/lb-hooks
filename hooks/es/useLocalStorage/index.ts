import { useState } from 'react';

function useLocalStorage<T = undefined>(
    key: string
): [T | undefined, (value?: T) => void];

function useLocalStorage<T>(
    key: string,
    defaultValue: T
): [T, (value?: T) => void];

function useLocalStorage<T>(
    key: string,
    defaultValue?: T
) {
    const [state, setState] = useState<T | undefined>(() => getStoredValue());

    function getStoredValue() {
        const raw = localStorage.getItem(key);
        if (raw) {
            try {
                return JSON.parse(raw);
            } catch (e) { }
        }
        return defaultValue;
    }

    function updateState(value?: T) {
        if (typeof value === 'undefined') {
            localStorage.removeItem(key);
            setState(undefined);
        } else {
            localStorage.setItem(key, JSON.stringify(value));
            setState(value);
        }
    }

    return [state, updateState]
}

export default useLocalStorage;
