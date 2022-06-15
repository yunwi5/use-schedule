import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';

import classes from './AddItemIcon.module.scss';
import { CustomTheme } from '../../../models/CustomTheme';

interface Props {
    text: string | JSX.Element;
    theme?: CustomTheme | null;
    href?: string;
    onClick?: () => void;
}

const AddItemIcon: React.FC<Props> = ({ theme, text, href, onClick }) => {
    return (
        <a
            href={`${href ?? '#'}`}
            onClick={onClick}
            className={`sm:w-10 sm:h-10 md:w-14 md:h-14 text-slate-500 border-2 border-slate-300 shadow-md rounded-full text-3xl hover:bg-slate-500 hover:text-slate-100 ${
                classes['add-icon']
            } ${theme ? 'hover:bg-transparent' : ''}`}
        >
            <FontAwesomeIcon
                icon={faPlus}
                className={`max-w-[3rem] max-h-[3rem] ${theme ? 'text-white' : ''}`}
            />
            <span className={`${classes['add-icon-text']}`}>{text}</span>
        </a>
    );
};

export default AddItemIcon;
