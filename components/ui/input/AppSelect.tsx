import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
    label: string;
    value: string;
    onChange(value: string): void;
    options: string[];
    className?: string;
    id?: string;
    labelId?: string;
}

const AppSelect: React.FC<Props> = (props) => {
    const { id, labelId, className, onChange, options, label, value } = props;

    return (
        <FormControl sx={{ minWidth: 110 }} size="small" className={className || ''}>
            <InputLabel id={labelId || 'app-select-label'}>{label}</InputLabel>
            <Select
                labelId={labelId || 'app-select-label'}
                id={id || 'app-select'}
                value={value}
                onChange={(e: SelectChangeEvent<any>) => onChange(e.target.value)}
                label={label}
            >
                {options.map((opt, idx) => (
                    <MenuItem key={idx} value={opt}>
                        {opt}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default AppSelect;
