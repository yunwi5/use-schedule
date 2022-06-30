import { useEffect } from 'react';

interface Props {
    breakPoint: number;
    aboveBreakPointCallback?: Function;
    belowBreakPointCallback?: Function;
}

// Update DOM elements dynamically according to window.innerWidth - similar to media query
const useWindowInnerWidth = ({
    breakPoint,
    aboveBreakPointCallback,
    belowBreakPointCallback,
}: Props) => {
    // useEffect instead of useLayoutEffect due to ssr
    useEffect(() => {
        const updateDropDownVisibility = () => {
            const newWindowWidth = window.innerWidth;
            if (newWindowWidth >= breakPoint) {
                aboveBreakPointCallback && aboveBreakPointCallback();
            } else {
                belowBreakPointCallback && belowBreakPointCallback();
            }
        };
        window.addEventListener('resize', updateDropDownVisibility);
        return () => window.removeEventListener('resize', updateDropDownVisibility);
    }, [breakPoint, aboveBreakPointCallback, belowBreakPointCallback]);

    return {};
};

export default useWindowInnerWidth;
