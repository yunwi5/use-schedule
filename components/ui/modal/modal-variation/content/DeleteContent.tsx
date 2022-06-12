import { Theme } from '../../../../../models/design-models';
import Button from '../../../buttons/Button';
import classes from '../GeneralModal.module.scss';

interface Props {
    targetName?: string;
    onAction: () => void;
    onClose: () => void;
}

const deleteContent: React.FC<Props> = (props) => {
    const { targetName, onAction, onClose } = props;

    return (
        <>
            <p>
                Do you really want to delete{' '}
                {targetName && <strong>&quot;{targetName}&quot;</strong>}
                &nbsp;?
            </p>
            <div className={classes.btns}>
                <Button theme={Theme.DANGER} onClick={onAction}>
                    Confirm
                </Button>
                <Button
                    theme={Theme.SECONDARY}
                    onClick={onClose}
                    className={`${classes['btn-cancel']}`}
                >
                    Cancel
                </Button>
            </div>
        </>
    );
};

export default deleteContent;
