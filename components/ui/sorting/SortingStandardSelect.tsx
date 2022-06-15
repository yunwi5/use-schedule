import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
    sortList: string[];
    sortTarget: string | null;
    onChange: (e: SelectChangeEvent<string>) => void;
    light?: boolean;
}

const SortingStandardSelect: React.FC<Props> = (props) => {
    const { sortList, sortTarget, onChange, light } = props;

    return (
        <FormControl
            sx={{ minWidth: 120 }}
            size="small"
            className={`${light ? 'mui-light-select' : ''} shadow-md`}
        >
            <InputLabel id="sort-target-label">Sort By</InputLabel>
            <Select
                labelId="sort-target-label"
                id="sort-target"
                value={sortTarget || ''}
                onChange={onChange}
                label="Sort By"
            >
                <MenuItem disabled selected value="">
                    select
                </MenuItem>
                {sortList.map((standard) => (
                    <MenuItem key={standard} value={standard}>
                        {standard}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SortingStandardSelect;
