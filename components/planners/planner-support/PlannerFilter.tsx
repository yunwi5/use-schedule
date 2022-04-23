import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsFilter } from "@fortawesome/pro-solid-svg-icons";

import { filterActions } from "../../../store/redux/filter-slice";
import { ImportanceList, StatusList } from "../../../models/task-models/Status";
import { Category, CategoryList, getSubCategory } from "../../../models/task-models/Category";
import { Filter } from "../../../utilities/tasks-utils/filter-util";

function getFilterList(filter: Filter) {
    switch (filter) {
        case Filter.IMPORTANCE:
            return ImportanceList;
        case Filter.CATEGORY:
            return CategoryList;
        case Filter.STATUS:
            return StatusList;
    }
}

// More features will be added as the filter part is getting implemented.
const PlannerFilter: React.FC = () => {
    const dispatch = useDispatch();
    const { filterTarget, mainFilter, subFilter } = useSelector(
        (state: RootStateOrAny) => state.filter,
    );

    const [isFiltering, setIsFiltering] = useState(false);

    // CategoryList, ImportanceList, or TaskStatusList
    const [mainFilterList, setMainFilterList] = useState<null | string[]>(null);

    // One of SubCategoryList or null
    const [subFilterList, setSubFilterList] = useState<null | string[]>(null);

    const clearFilters = () => {
        setMainFilterList(null);
        setSubFilterList(null);

        // Redux update
        dispatch(filterActions.clearFilters());
    };

    const showFilterHandler = () => {
        setIsFiltering((prevState) => !prevState);
        clearFilters();
    };

    const filterTargetHandler = (e: SelectChangeEvent) => {
        const newFilterTarget = e.target.value.trim();
        if (!newFilterTarget) return;
        const newFilterList = getFilterList(newFilterTarget as Filter);
        clearFilters();
        setMainFilterList((prev) => newFilterList);

        // Redux update
        dispatch(filterActions.updateFilterTarget(newFilterTarget));
    };

    const mainFilterHandler = (e: SelectChangeEvent) => {
        const newMainFilter = e.target.value.trim();
        if (!newMainFilter) return;

        // Redux update
        dispatch(filterActions.updateMainFilter(newMainFilter));
        dispatch(filterActions.updateSubFilter(null));
    };

    const subFilterHandler = (e: SelectChangeEvent) => {
        const newSubFilter = e.target.value.trim();
        if (!newSubFilter) return;

        // Redux update
        dispatch(filterActions.updateSubFilter(newSubFilter));
    };

    useEffect(() => {
        if (
            filterTarget === "Category" &&
            mainFilter &&
            CategoryList.includes(mainFilter as Category)
        ) {
            const subCategoryList = getSubCategory(mainFilter as Category);
            dispatch(filterActions.updateSubFilter(null));
            setSubFilterList(subCategoryList);
        }
    }, [mainFilter, filterTarget, dispatch]);

    const showMainFilter = isFiltering && filterTarget && mainFilterList;
    const showSubFilter = isFiltering && filterTarget === "Category" && subFilterList;

    return (
        <div className="flex items-center mr-auto ml-2 space-x-4">
            <div className="flex items-center">
                Filter
                <button
                    onClick={showFilterHandler}
                    className="flex justify-center items-center bg-slate-500 hover:bg-slate-500 text-white ml-2  w-11 h-11 rounded-full"
                >
                    <FontAwesomeIcon icon={faBarsFilter} className="max-w-[1.3rem] text-xl" />
                </button>
            </div>
            {isFiltering && (
                <div className="flex flex-col items-start space-y-1">
                    <FormControl sx={{ minWidth: 120 }} size="small">
                        <InputLabel id="filter-target-label">Filter By</InputLabel>
                        <Select
                            labelId="filter-target-label"
                            id="filter-target"
                            value={filterTarget || ""}
                            onChange={filterTargetHandler}
                            label="Filter By"
                        >
                            <MenuItem disabled selected value="">
                                select
                            </MenuItem>
                            <MenuItem value="Category">{Filter.CATEGORY}</MenuItem>
                            <MenuItem value="Importance">{Filter.IMPORTANCE}</MenuItem>
                            <MenuItem value="Status">{Filter.STATUS}</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            )}
            {showMainFilter && (
                <div>
                    <FormControl sx={{ minWidth: 120 }} size="small">
                        <InputLabel id="main-filter-label">Main Filter</InputLabel>
                        <Select
                            name="main-filter"
                            labelId="main-filter-label"
                            id="main-filter"
                            onChange={mainFilterHandler}
                            value={mainFilter || ""}
                            label="Main Filter"
                        >
                            <MenuItem selected disabled value="">
                                select
                            </MenuItem>
                            {mainFilterList.map((item) => (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            )}
            {showSubFilter && (
                <div className="h-full flex items-end">
                    <FormControl sx={{ minWidth: 120 }} size="small">
                        <InputLabel id="sub-filter-label">Sub Filter</InputLabel>
                        <Select
                            labelId="sub-filter-label"
                            id="sub-filter"
                            value={subFilter || ""}
                            onChange={subFilterHandler}
                            label="Sub Filter"
                        >
                            <MenuItem disabled selected value="">
                                select
                            </MenuItem>
                            {subFilterList.map((item) => (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            )}
        </div>
    );
};

export default PlannerFilter;
