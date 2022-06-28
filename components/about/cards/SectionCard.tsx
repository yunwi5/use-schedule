import React from 'react';
import { AboutTheme } from '../../../models/design-models';
import classes from '../About.module.scss';

const SectionCard: React.FC<{ theme: AboutTheme }> = ({ children, theme }) => {
    return (
        <section
            className={`mt-16 pb-10 flex flex-col gap-10 border-b-[2px] border-b-slate-400 ${
                classes[`section-${theme}`]
            }`}
        >
            {children}
        </section>
    );
};

export default SectionCard;
