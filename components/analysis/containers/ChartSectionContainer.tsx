import React from 'react';

interface Props {
    title?: string;
    showComparison?: boolean;
}

const AnalysisSectionWrapper: React.FC<Props> = ({ showComparison, children }) => {
    return (
        <div
            className={`mb-12 flex flex-wrap lg:flex-nowrap ${
                showComparison ? 'lg:!flex-wrap' : 'xl:pr-[8rem]'
            }  gap-6`}
        >
            {children}
        </div>
    );
};

export default AnalysisSectionWrapper;
