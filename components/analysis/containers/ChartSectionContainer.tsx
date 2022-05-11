import React from 'react';

interface Props {
    title?: string;
}

const AnalysisSectionWrapper: React.FC<Props> = ({ title, children }) => {
    return <div className="flex flex-wrap gap-6 pr-4 items-center">{children}</div>;
};

export default AnalysisSectionWrapper;
