import React from 'react';

// Need to be updated for smaller screens like tablet and mobile.
const FlexChartContainer: React.FC = ({ children }) => {
    return <div className="lg:w-[49%]">{children}</div>;
};

export default FlexChartContainer;
