import { faArrowsRotate, faSnooze } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomMUIButton from './ui/buttons/CustomMUIButton';

interface Props {
    onReload(): void;
}

const OfflineFallback: React.FC<Props> = ({ onReload }) => {
    return (
        <div
            style={{ marginTop: '5vh', gap: '1.8rem', minHeight: '85vh' }}
            className="px-6 md:px-10 lg:px-16 flex flex-col justify-center items-center text-slate-600"
        >
            <h2 className={'text-3xl'}>
                <FontAwesomeIcon icon={faSnooze} className={'mr-2'} />
                You are currently offline...
            </h2>
            <h4 className={'text-lg md:text-xl max-w-[50rem] text-center'}>
                Our scheduling services primarily based on online connection. So please
                makesure to connect to the internet to fully enjoy our services!
            </h4>
            <CustomMUIButton className={'!px-8'} size="large" onClick={onReload}>
                <FontAwesomeIcon icon={faArrowsRotate} className={'mr-2'} /> Try reload
            </CustomMUIButton>
        </div>
    );
};

export default OfflineFallback;
