import { faAngleRight } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { AboutSectionList } from '../../../constants/about-sections';
import styles from './AboutNavigation.module.scss';

const AboutNavigation: React.FC = () => {
    return (
        <nav className={`text-lg md:text-xl ${styles.nav}`}>
            {AboutSectionList.map((section) => (
                <div key={section.name} className={styles.item}>
                    <FontAwesomeIcon
                        icon={faAngleRight}
                        className={`icon-medium ${styles.icon}`}
                    />
                    <a href={section.link}>{section.name}</a>
                </div>
            ))}
        </nav>
    );
};

export default AboutNavigation;
