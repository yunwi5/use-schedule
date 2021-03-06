import WrapperModal from '../../ui/modal/wrapper/WrapperModal';
import ExitIcon from '../../ui/icons/ExitIcon';
import classes from './PlannerModal.module.scss';

interface Props {
    onClose: () => void;
    title: string;
}

const PlannerModal: React.FC<Props> = ({ onClose, title, children }) => {
    return (
        <WrapperModal onClose={onClose} className={'!px-1 !py-1'}>
            <div className={classes.modal}>
                <div className={classes.heading}>
                    <h3>{title}</h3>
                    <ExitIcon onClose={onClose} className={'!top-4 !right-4'} />
                </div>
                {children}
            </div>
        </WrapperModal>
    );
};

export default PlannerModal;
