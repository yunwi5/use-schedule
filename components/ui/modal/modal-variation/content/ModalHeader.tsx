import ExitIcon from '../../../icons/ExitIcon';

const ModalHeader: React.FC<{ onClose(): void; title: string }> = ({ title, onClose }) => {
    return (
        <>
            <h2>{title}</h2>
            <ExitIcon
                onClose={onClose}
                className={`!top-4 !right-4 !text-slate-500 hover:!text-rose-500`}
            />
        </>
    );
};

export default ModalHeader;
