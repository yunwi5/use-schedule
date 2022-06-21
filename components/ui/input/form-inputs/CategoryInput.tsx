import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListTree } from '@fortawesome/pro-duotone-svg-icons';
import { UseFormRegister } from 'react-hook-form';

// import {  ImportanceList } from '../../../../models/task-models/Status';
import { Category, CategoryList } from '../../../../models/task-models/Category';
import classes from './FormInput.module.scss';

interface Props {
    register: UseFormRegister<any>;
    initialItem?: { category?: string };
    className?: string;
}

const CategoryInput: React.FC<Props> = ({ register, initialItem, className }) => {
    return (
        <div className={`${classes.section} w-[45%] ${className}`}>
            <label htmlFor="Category">
                <FontAwesomeIcon icon={faListTree} className={'icon-medim mr-2'} />
                Category
            </label>
            <select
                id="Category"
                defaultValue={initialItem?.category || Category.OTHERS}
                {...register('category')}
            >
                {CategoryList.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategoryInput;
