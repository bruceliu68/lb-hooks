import { useCallback, useState } from "react";
import copy from "copy-to-clipboard";

interface CopyToClipboardState {
    value?: string;
    error?: Error;
    isCopy: boolean;
}

const useCopyToClipboard = (): [CopyToClipboardState, (val: string) => void] => {
    const [state, setState] = useState<CopyToClipboardState>({
        value: undefined,
        error: undefined,
        isCopy: false
    });

    const copyToClipboard = useCallback((value) => {
        let normalizedValue;
        try {
            // only strings and numbers casted to strings can be copied to clipboard
            if (typeof value !== 'string' && typeof value !== 'number') {
                const error = new Error(`Cannot copy typeof ${typeof value} to clipboard, must be a string`);
                if (process.env.NODE_ENV === 'development') console.error(error);
                setState({
                    value: undefined,
                    error,
                    isCopy: false
                });
                return;
            }
            // empty strings are also considered invalid
            else if (value === '') {
                const error = new Error(`Cannot copy empty string to clipboard.`);
                if (process.env.NODE_ENV === 'development') console.error(error);
                setState({
                    value: undefined,
                    error,
                    isCopy: false
                });
                return;
            }
            if (typeof value === 'number') {
                normalizedValue = `${value}`;
            } else {
                normalizedValue = value.toString();
            }
            let isCopyFlag = copy(normalizedValue);

            setState({
                value: normalizedValue,
                error: undefined,
                isCopy: isCopyFlag
            });
        } catch (error) {
            setState({
                value: undefined,
                error,
                isCopy: false
            });
        }
    }, []);

    return [state, copyToClipboard];
}

export default useCopyToClipboard;