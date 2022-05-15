import React, { useState } from 'react';
import DropDownToggler from '../../../ui/icons/DropDownToggler';
import Checkbox from '../../../ui/input/Checkbox';

interface Props {
    filterName: string;
    filterList: string[];
    onToggleItem: (name: string) => void;
    onCheck: (name: string) => boolean;
}

const FilterSection: React.FC<Props> = (props) => {
    const [showDropDown, setShowDropDown] = useState(true);
    const { filterName, filterList, onToggleItem, onCheck } = props;

    const toggleDropdown = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowDropDown((ps) => !ps);
    };

    return (
        <div>
            <h3
                className={`flex justify-between items-center font-semibold text-slate-500 hover:bg-slate-100 cursor-pointer ${
                    showDropDown ? 'mb-1' : ''
                } parent-hider`}
                onClick={toggleDropdown}
            >
                {filterName}
                <DropDownToggler
                    onToggle={toggleDropdown}
                    showDropDown={showDropDown}
                    className="!text-lg translate-y-[1.5px] child-hider"
                />
            </h3>
            {showDropDown && (
                <ul>
                    {filterList.map((item) => (
                        <li
                            key={item}
                            className="flex items-center gap-2 transition-all hover:bg-slate-100"
                        >
                            <Checkbox
                                label={item}
                                inputName={filterName}
                                onToggle={() => onToggleItem(item)}
                                checked={onCheck(item)}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FilterSection;
