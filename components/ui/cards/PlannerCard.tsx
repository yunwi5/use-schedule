import React from 'react';

const PlannerCard: React.FC = (props) => {
	return <main className='px-6 py-6 flex flex-col transition-all'>{props.children}</main>;
};

export default PlannerCard;
