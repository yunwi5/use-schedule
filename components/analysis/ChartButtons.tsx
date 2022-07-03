import CustomMUIButton from '../ui/buttons/CustomMUIButton';

interface Props {
    onShowComparison?: () => void;
    showComparison?: boolean;
    additionalButton?: JSX.Element;
}

const ChartButtons: React.FC<Props> = ({
    onShowComparison,
    showComparison,
    additionalButton,
}) => (
    <div
        className={`self-stretch order-3 max-w-[35rem] xl:max-w-none mt-5 flex flex-wrap flex-col sm:flex-row gap-4 ${
            showComparison ? 'pr-5' : ''
        }`}
    >
        <CustomMUIButton variant="text" onClick={onShowComparison}>
            {showComparison ? 'Hide Comparison' : 'Show Comparison'}
        </CustomMUIButton>
        {additionalButton}
    </div>
);

export default ChartButtons;
