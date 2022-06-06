import Button from '@mui/material/Button';
import React from 'react';
import { Theme } from '../../models/design-models';
import CustomButton from '../ui/buttons/Button';

interface Props {
    onShowComparison?: () => void;
    showComparison?: boolean;
    additionalButton?: JSX.Element;
}

const ChartButtons: React.FC<Props> = ({ onShowComparison, showComparison, additionalButton }) => (
    <div
        className={`order-3 w-[35rem] xl:max-w-none mt-5 flex flex-wrap flex-col sm:flex-row gap-4`}
    >
        <Button
            className={`!py-2 !bg-blue-50/70 hover:!bg-blue-100 shadow-md hover:shadow-lg transition-all !border-blue-400`}
            variant="text"
            onClick={onShowComparison}
        >
            {showComparison ? 'Hide Comparison' : 'Show Comparison'}
        </Button>
        {/* <CustomButton
            className={`!bg-white !border-blue-400 !text-blue-600`}
            theme={Theme.TERTIARY}
        >
            {showComparison ? 'Hide Comparison' : 'Show Comparison'}
        </CustomButton> */}
        {additionalButton}
    </div>
);

export default ChartButtons;
