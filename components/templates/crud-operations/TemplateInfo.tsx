import React, { useState, Fragment, useEffect, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faMagnifyingGlass } from '@fortawesome/pro-duotone-svg-icons';
import { faXmark } from '@fortawesome/pro-solid-svg-icons';

import classes from './TemplateInfo.module.scss';
import { Template } from '../../../models/template-models/Template';
import { faQuoteLeft } from '@fortawesome/pro-duotone-svg-icons';
import Link from 'next/link';
import { getAboutLink } from '../../../utilities/link-utils';
import { TemplateSection } from '../../../constants/about-sections';
import LearnMoreLink from '../../ui/typography/LearnMoreLink';

interface Props {
    template: Template | undefined;
}

const TemplateInfo: React.FC<Props> = ({ template }) => {
    const [showInfo, setShowInfo] = useState(true);

    useEffect(() => setShowInfo(true), [template]);

    return (
        <Fragment>
            {showInfo && (
                <div className={`${classes.card}`}>
                    <FontAwesomeIcon
                        icon={faXmark}
                        onClick={setShowInfo.bind(null, false)}
                        className="max-w-[2.1rem] text-slate-600 hover:text-rose-500 absolute top-3 right-3 text-xl cursor-pointer hover:scale-125 transition-all"
                    />
                    <FontAwesomeIcon
                        icon={faCircleInfo}
                        className="max-w-[2.2rem] text-blue-700 text-2xl"
                    />
                    <h3>About Template</h3>
                    <div className={classes.paras}>
                        <p>
                            <FontAwesomeIcon icon={faQuoteLeft} className={classes.icon} />
                            Use template planner to add repetitive tasks to whenever week you
                            want.
                        </p>
                        <p>
                            <FontAwesomeIcon icon={faQuoteLeft} className={classes.icon} />
                            Please complete the template form first if you have not already,
                            before using it.
                        </p>
                        <LearnMoreLink href={getAboutLink(TemplateSection.link)}>
                            Learn More About Template!
                        </LearnMoreLink>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default memo(TemplateInfo);
