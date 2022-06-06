import React from 'react';

// Need to be updated for smaller screens like tablet and mobile.
const FlexChartContainer: React.FC = ({ children }) => {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-between flex-wrap w-full">
            {children}
        </div>
    );
};

export default FlexChartContainer;
