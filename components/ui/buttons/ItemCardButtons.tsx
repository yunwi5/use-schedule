import { faMagnifyingGlass, faPenToSquare } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    onShowDetail(): void;
    onShowEdit(): void;
}

const ItemCardButtons: React.FC<Props> = ({ onShowDetail, onShowEdit }) => {
    return (
        <div className={'absolute flex gap-1 bottom-2 right-2 bg-inherit z-10 text-2xl'}>
            <div
                className={
                    'show-on-hover-parent flex items-center gap-2 px-2 py-1 hover:border-2 border-blue-400 rounded-sm hover:bg-blue-100/80'
                }
                onClick={onShowDetail}
            >
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className={`icon-medium text-blue-500 transition-all hover:scale-110`}
                />
                <span className={'show-on-hover-child text-lg text-blue-800'}>Detail</span>
            </div>
            <div
                className={
                    'show-on-hover-parent flex items-center gap-2 px-2 py-1 hover:border-2 border-pink-400 rounded-sm hover:bg-pink-100/80'
                }
                onClick={onShowEdit}
            >
                <FontAwesomeIcon
                    icon={faPenToSquare}
                    className={`icon-medium text-pink-500 transition-all hover:scale-110`}
                />
                <span className={'show-on-hover-child text-lg text-pink-800'}>Edit</span>
            </div>
        </div>
    );
};

export default ItemCardButtons;
