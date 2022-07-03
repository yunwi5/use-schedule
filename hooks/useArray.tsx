import React, { useCallback, useDebugValue, useState } from 'react';

// type T = Record<string, any>;

function useArray<T>(array: T[]) {
    const [localArray, setLocalArray] = useState<T[]>(array);

    useDebugValue(localArray);

    const addItem = useCallback(
        (item: T) => {
            setLocalArray([...localArray, item]);
        },
        [localArray],
    );

    const editItem = useCallback(
        (id: string, itemProps: T | object) => {
            setLocalArray(
                localArray.map((item) => {
                    if ((item as any)?.id !== id) return item;
                    return { ...item, itemProps };
                }),
            );
        },
        [localArray],
    );

    const deleteItem = useCallback(
        (id: string) => {
            setLocalArray(localArray.filter((item) => (item as any).id !== id));
        },
        [localArray],
    );

    return {
        array: localArray,
        setArray: setLocalArray,
        addItem,
        editItem,
        deleteItem,
    };
}

export default useArray;
