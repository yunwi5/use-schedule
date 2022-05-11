import React from 'react';

interface Props {
    title?: string;
    showComparison?: boolean;
}

const AnalysisSectionWrapper: React.FC<Props> = ({ showComparison, children }) => {
    return (
        <div className={`mb-12 flex ${showComparison ? 'flex-wrap' : ''}  gap-6 xl:pr-[8rem]`}>
            {children}
        </div>
    );
};

export default AnalysisSectionWrapper;
