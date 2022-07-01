import React from 'react';

const TableNavCard: React.FC<{ className?: string }> = (props) => {
    return (
        <div className={`mt-2 ml-2 flex items-center justify-between p-3 ${props.className}`}>
            {props.children}
        </div>
    );
};

export default TableNavCard;
