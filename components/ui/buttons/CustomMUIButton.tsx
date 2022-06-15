import Button from '@mui/material/Button';
import React from 'react';

interface Props {
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    variant?: 'text' | 'outlined' | 'contained';
    style?: object;
    className?: string;
}

const CustomMUIButton: React.FC<Props> = (props) => {
    const { onClick, type, disabled, variant, style, className } = props;

    return (
        <Button
            className={`!py-2 !bg-blue-50/70 hover:!bg-blue-100 shadow-md hover:shadow-lg transition-all !border-blue-400 ${
                className ?? ''
            }`}
            type={type ?? 'button'}
            disabled={disabled}
            variant={variant}
            style={style}
            onClick={onClick}
        >
            {props.children}
        </Button>
    );
};

export default CustomMUIButton;
