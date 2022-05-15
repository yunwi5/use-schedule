import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
    label: string;
    value: string | number;
    onChange(value: string): void;
    options: string[] | readonly string[] | number[] | readonly number[];
    optionLabels?: string[];
    className?: string;
    id?: string;
    labelId?: string;
}

const AppSelect: React.FC<Props> = (props) => {
    const { id, labelId, className, onChange, options, optionLabels, label, value } = props;

    return (
        <FormControl sx={{ minWidth: 95 }} size="small" className={className || ''}>
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
                        {optionLabels && optionLabels.length > idx ? optionLabels[idx] : opt}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default AppSelect;
