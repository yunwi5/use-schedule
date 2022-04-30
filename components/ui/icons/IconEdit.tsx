import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/pro-duotone-svg-icons";
import { faCheck, faXmark } from "@fortawesome/pro-solid-svg-icons";

import classes from "./IconEdit.module.scss";
import { Size } from "../../../models/design-models";

interface Props {
    isEditing: boolean;
    onEdit: () => void;
    onCheck: () => void;
    onCancel?: () => void;
    size?: Size;
    className?: string;
}

const IconEdit: React.FC<Props> = (props) => {
    const { isEditing, onEdit, onCheck, onCancel, size = Size.MEDIUM, className = "" } = props;

    return (
        <>
            {!isEditing && (
                <div className={`absolute right-0 top-[50%] -translate-y-[50%]`}>
                    <FontAwesomeIcon
                        icon={faPencilAlt}
                        onClick={onEdit}
                        className={`${classes.icon} ${
                            classes["icon-" + size]
                        } text-sky-600/75 ${className}`}
                    />
                </div>
            )}
            {isEditing && (
                <div className={`absolute right-0 top-[50%] -translate-y-[50%] flex gap-2`}>
                    <FontAwesomeIcon
                        icon={faCheck}
                        onClick={onCheck}
                        className={`${classes.icon} ${
                            classes["icon-" + size]
                        } text-teal-600 ${className}`}
                    />
                    {onCancel && (
                        <FontAwesomeIcon
                            icon={faXmark}
                            className={`${classes.icon} ${
                                classes["icon-" + size]
                            } text-rose-600 ${className}`}
                            onClick={onCancel}
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default IconEdit;
