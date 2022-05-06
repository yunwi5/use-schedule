import React, { useLayoutEffect } from 'react';

interface Props {
    breakPoint: number;
    breakPointCallback: Function;
    nonBreackPointCallback?: Function;
}

// Update DOM elements dynamically according to window.innerWidth - similar to media query
const useWindowInnerWidth = ({ breakPoint, breakPointCallback, nonBreackPointCallback }: Props) => {
    useLayoutEffect(() => {
        const updateDropDownVisibility = () => {
            const newWindowWidth = window.innerWidth;
            if (newWindowWidth >= breakPoint) {
                breakPointCallback();
            } else {
                nonBreackPointCallback && nonBreackPointCallback();
            }
        };
        window.addEventListener('resize', updateDropDownVisibility);
        return () => window.removeEventListener('resize', updateDropDownVisibility);
    }, [breakPoint, breakPointCallback, nonBreackPointCallback]);

    return {};
};

export default useWindowInnerWidth;
