import { useState } from 'react';

function useSessionStorage<T = undefined>(
    key: string
): [T | undefined, (value?: T) => void];

function useSessionStorage<T>(
    key: string,
    defaultValue: T
): [T, (value?: T) => void];

function useSessionStorage<T>(
    key: string,
    defaultValue?: T
) {
    const [state, setState] = useState<T | undefined>(() => getStoredValue());

    function getStoredValue() {
        const raw = sessionStorage.getItem(key);
        if (raw) {
            try {
                return JSON.parse(raw);
            } catch (e) { }
        }
        return defaultValue;
    }

    function updateState(value?: T) {
        if (typeof value === 'undefined') {
            sessionStorage.removeItem(key);
            setState(undefined);
        } else {
            sessionStorage.setItem(key, JSON.stringify(value));
            setState(value);
        }
    }

    return [state, updateState]
}

export default useSessionStorage;
