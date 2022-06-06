import React from 'react';

const AnalysisSectionContainer: React.FC<{ title: string }> = ({ title, children }) => {
    return (
        <section>
            <h2 className="mx-auto max-w-[35rem] lg:max-w-none mb-6 text-4xl capitalize">
                {title}
            </h2>
            {children}
        </section>
    );
};

export default AnalysisSectionContainer;
