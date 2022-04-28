import React from "react";
import Checkbox from "../../../ui/input/Checkbox";

interface Props {
    filterName: string;
    filterList: string[];
    onToggleItem: (name: string) => void;
    onCheck: (name: string) => boolean;
}

const FilterSection: React.FC<Props> = (props) => {
    const { filterName, filterList, onToggleItem, onCheck } = props;

    return (
        <div>
            <h3 className="text-xl mb-2">{filterName}</h3>
            <ul>
                {filterList.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                        {/* <input
                            type="checkbox"
                            name={filterName}
                            checked={onCheck(item)}
                            onChange={() => onToggleItem(item)}
                        />
                        <p>{item}</p> */}
                        <Checkbox
                            label={item}
                            inputName={filterName}
                            onToggle={() => onToggleItem(item)}
                            checked={onCheck(item)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FilterSection;
