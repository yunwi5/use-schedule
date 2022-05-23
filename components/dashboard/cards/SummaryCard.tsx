import React from 'react';

const SummaryCard: React.FC = ({ children }) => {
    return (
        <article
            className={`p-2 lg:w-[50%] xl:w-[25%] rounded-md shadow-md border-[1.2px] border-slate-200 flex flex-col gap-3`}
        >
            {children}
        </article>
    );
};

export default SummaryCard;
