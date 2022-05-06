import React, { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/pro-duotone-svg-icons';
import { faCheck, faXmark } from '@fortawesome/pro-regular-svg-icons';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';

import useNotification from '../../../hooks/useNotification';
import { NotifStatus } from '../../ui/Notification';
import { useAppSelector } from '../../../store/redux';
import { getFullDateFormat } from '../../../utilities/date-utils/date-format';
import { Template } from '../../../models/template-models/Template';
import { transferTemplateToWeekly } from '../../../lib/templates/templates-api';
import { Theme } from '../../../models/design-models';
import Button from '../../ui/Button';
import Modal from '../../ui/modal/Modal';
import classes from './ImportModal.module.scss';

interface Props {
    onClose(): void;
    beginningPeriod: Date;
    onMutate: () => void;
}

const override = css`
    display: block;
    margin: 0 auto;
    width: 120px;
    height: 120px;
    border-color: red;
`;

const ImportModal: React.FC<Props> = ({ onClose, beginningPeriod, onMutate }) => {
    const [selectedTemp, setSelectedTemp] = useState<Template | null>(null);
    const templates = useAppSelector((state) => state.template.templates);

    const [loading, setLoading] = useState(false);
    const { setNotification } = useNotification();

    const selectHandler = useCallback((temp: Template | null) => {
        setSelectedTemp(temp);
    }, []);

    const importHandler = async () => {
        if (!beginningPeriod || !selectedTemp) return;

        setNotification(NotifStatus.PENDING, 'Transferring template tasks...');
        setLoading(true);
        const { isSuccess, data } = await transferTemplateToWeekly(
            selectedTemp.id,
            new Date(beginningPeriod),
        );
        if (isSuccess) {
            setNotification(NotifStatus.SUCCESS);
            onMutate();
            onClose();
        } else {
            setNotification(NotifStatus.ERROR);
        }
        setLoading(false);
    };

    // console.log(`beginningPeriod: ${beginningPeriod ? beginningPeriod.toString() : ''}`);

    return (
        <Modal onClose={onClose} modalClass={`${classes.modal}`}>
            <FontAwesomeIcon
                icon={faXmark}
                className={`${classes.icon} ${classes.exit}`}
                onClick={onClose}
            />
            <h2 className={classes.heading}>Select a template to import</h2>
            <div className={classes.container}>
                {templates.map((temp) => (
                    <div
                        key={temp.id}
                        className={`${classes.template} ${
                            selectedTemp?.id === temp.id ? classes.selected : ''
                        }`}
                        onClick={selectHandler.bind(null, temp)}
                    >
                        <p className={classes.text}>{temp.name}</p>
                        {selectedTemp?.id === temp.id && (
                            <FontAwesomeIcon icon={faCheck} className={classes.icon} />
                        )}
                    </div>
                ))}
            </div>
            {selectedTemp && (
                <p className={classes.message}>
                    <FontAwesomeIcon icon={faCircleExclamation} className={classes.info} />
                    All tasks & sub tasks of your template{' '}
                    <span>&quot;{selectedTemp.name}&quot; </span> will be imported to the week
                    beginning at &nbsp;<time>{getFullDateFormat(beginningPeriod)}</time>.
                </p>
            )}
            {/* <ClipLoader color="#000000" loading={true} css={override} size={150} /> */}
            <div className={classes.control}>
                <Button
                    theme={Theme.WARNING}
                    className={classes.btn}
                    onClick={selectHandler.bind(null, null)}
                >
                    Clear
                </Button>
                <Button theme={Theme.TERTIARY} className={classes.btn} onClick={importHandler}>
                    Import
                </Button>
            </div>
        </Modal>
    );
};

export default ImportModal;
