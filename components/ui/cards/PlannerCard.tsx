import React from 'react';

const PlannerCard: React.FC<{ className?: string }> = ({ className, children }) => {
    return (
        <main className={`px-3 pt-5 pb-10 flex flex-col transition-all ${className || ''}`}>
            {children}
        </main>
    );
};

export default PlannerCard;
