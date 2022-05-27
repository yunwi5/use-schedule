import React from 'react';

const PlannerCard: React.FC = (props) => {
    return <main className="px-3 pt-5 pb-10 flex flex-col transition-all">{props.children}</main>;
};

export default PlannerCard;
