import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { SortingDirection } from "../../../models/sorting-models";
import classes from "./Select.module.scss"; // overwriting default MUI styles

interface Props {
    direction: SortingDirection | null;
    onChange: (e: SelectChangeEvent) => void;
    light?: boolean;
}

const DirectionSelect: React.FC<Props> = ({ direction, onChange, light }) => {
    return (
        <FormControl
            sx={{ minWidth: 120 }}
            size="small"
            className={light ? "mui-light-select" : ""}
        >
            <InputLabel id="sort-direction-label">Direction</InputLabel>
            <Select
                labelId="sort-direction-label"
                id="sort-direction"
                value={direction || ""}
                onChange={onChange}
                label="Direction"
            >
                <MenuItem disabled selected value="">
                    select
                </MenuItem>
                <MenuItem value={SortingDirection.Ascending}>{SortingDirection.Ascending}</MenuItem>
                <MenuItem value={SortingDirection.Descending}>
                    {SortingDirection.Descending}
                </MenuItem>
            </Select>
        </FormControl>
    );
};

export default DirectionSelect;
