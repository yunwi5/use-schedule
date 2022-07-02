import { useState } from 'react';
import { useRouter } from 'next/router';

import { Template, TemplateFormObj } from '../../../models/template-models/Template';
import useNotification from '../../../hooks/useNotification';
import { deleteTemplate } from '../../../lib/templates/templates-api';
import { NotifStatus } from '../../ui/Notification';
import { templateActions } from '../../../store/redux/template-slice';
import { useDispatch } from 'react-redux';
import TemplateInfo from './TemplateInfo';
import DeleteModal from '../../ui/modal/modal-variation/DeleteModal';
import TemplateForm from './TemplateForm';

interface Props {
    onAddOrEdit: (newTemplate: TemplateFormObj, isNew: boolean) => Promise<boolean>;
    initialTemplate?: Template;
}

const TemplateControl: React.FC<Props> = ({ onAddOrEdit, initialTemplate }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { setNotification } = useNotification();
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    const deleteHandler = async () => {
        if (!initialTemplate) return;
        setShowDeleteModal(false);
        setNotification(NotifStatus.PENDING, 'Delete template in progress...');

        const { isSuccess, message } = await deleteTemplate(initialTemplate.id);

        if (isSuccess) {
            setNotification(NotifStatus.SUCCESS, 'Deletion successful!');
            dispatch(templateActions.callUpdate());
            router.replace('/');
        } else {
            setNotification(NotifStatus.ERROR, message);
        }
    };

    return (
        <div className={`flex flex-wrap gap-[1rem] justify-between`}>
            {showDeleteModal && (
                <DeleteModal
                    targetName={initialTemplate ? initialTemplate.name : 'template'}
                    onAction={deleteHandler}
                    onClose={() => setShowDeleteModal(false)}
                />
            )}
            <TemplateInfo template={initialTemplate} />
            <TemplateForm
                onSubmit={onAddOrEdit}
                initialTemplate={initialTemplate}
                onDelete={() => setShowDeleteModal(true)}
            />
        </div>
    );
};

export default TemplateControl;
