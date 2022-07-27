import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { Status, StatusList } from '../../../../models/task-models/Status';

interface Props {
    value: string;
    onChange(val: string): void;
}

// Custom select component for the schedule item status.
// Only for the Status input.
const StatusSelect: React.FC<Props> = ({ value, onChange }) => {
    return (
        <FormControl size="small" sx={{ mt: 1, minWidth: 120, maxWidth: 130 }}>
            <Select
                id="status-select"
                value={value}
                onChange={(e: SelectChangeEvent) => onChange(e.target.value as Status)}
            >
                {StatusList.map((s) => (
                    <MenuItem key={s} value={s}>
                        {s}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default StatusSelect;
