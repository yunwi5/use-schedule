import classes from './AppCheckbox.module.scss';

interface Props {
    label: string;
    inputName: string;
    onToggle: () => void;
    checked: boolean;
}

const Checkbox: React.FC<Props> = (props) => {
    const { label, inputName, onToggle, checked } = props;

    return (
        <label className={classes.container}>
            <span className={classes.text}>{label}</span>
            <input name={inputName} onChange={onToggle} type="checkbox" checked={checked} />
            <span
                className={`${classes.checkmark} ${
                    classes['checkmark-' + label.split(' ').join('')]
                }`}
            ></span>
        </label>
    );
};

export default Checkbox;
