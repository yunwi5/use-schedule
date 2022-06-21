import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiagramNested } from '@fortawesome/pro-duotone-svg-icons';
import { UseFormRegister } from 'react-hook-form';

import classes from './FormInput.module.scss';

interface Props {
    register: UseFormRegister<any>;
    initialItem?: { Category?: string; subCategory?: string };
    subCategoryList: string[];
    className?: string;
}

const CategoryInput: React.FC<Props> = ({ register, initialItem, className, subCategoryList }) => {
    return (
        <div className={`${classes.section} w-[45%] ${className}`}>
            <label htmlFor="sub-category">
                <FontAwesomeIcon icon={faDiagramNested} className={'icon-medim mr-2'} />
                SubCategory
            </label>
            <select
                id="sub-category"
                defaultValue={initialItem?.subCategory}
                {...register('subCategory')}
            >
                {subCategoryList.map((sub) => (
                    <option key={sub} value={sub}>
                        {sub}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategoryInput;
