import React from 'react';

interface Props {
    title: string;
}

const AnalysisSectionWrapper: React.FC<Props> = ({ title, children }) => {
    return (
        <div>
            {/* <h2 className="text-3xl mb-2 capitalize">{title}</h2> */}
            {/* Chart on the left, messages of two paragraphs on the right */}
            <div className="flex flex-wrap gap-6 pr-4 items-center">{children}</div>
        </div>
    );
};

export default AnalysisSectionWrapper;
