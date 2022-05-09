import React from 'react';

const PageHeading: React.FC<{ title: string }> = ({ title }) => {
    return <h1 className="text-3xl lg:text-4xl font-normal mb-3 md:mb-5">{title}</h1>;
};

export default PageHeading;
