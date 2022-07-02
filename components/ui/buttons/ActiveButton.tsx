import Button from './Button';
import { Theme, ButtonTheme, Size } from '../../../models/design-models';

interface Props {
    size?: Size;
    theme?: Theme | ButtonTheme;
    className?: string;
    type?: string;
    disabled?: boolean;
    style?: object;
    isActive: boolean;
    onClick?: () => void;
}

const ActiveButton: React.FC<Props> = (props) => {
    const { isActive, className } = props;
    return (
        <Button
            {...props}
            className={`${className} ${isActive ? '' : '!bg-slate-50 !text-slate-600'}`}
        >
            {props.children}
        </Button>
    );
};

export default ActiveButton;
