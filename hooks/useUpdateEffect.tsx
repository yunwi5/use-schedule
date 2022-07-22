import { useEffect, useRef } from 'react';

export default function useUpdateEffect(callback: Function, dependencies: any[]) {
    const firstRenderRef = useRef(true);

    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return;
        }
        return callback();
    }, dependencies);
}
