import { faCheck } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface Props {
    onToggle: () => void;
    isCompleted: boolean;
    className?: string;
}

const CheckToggler: React.FC<Props> = ({ onToggle, isCompleted, className }) => {
    const flexCenter = "flex items-center justify-center";

    return (
        <div
            onClick={onToggle}
            className={`${flexCenter} w-8 h-8 rounded-full border-2 border-green-200 cursor-pointer ${
                className ?? ""
            }`}
        >
            {isCompleted && (
                <FontAwesomeIcon icon={faCheck} className="max-w-5 max-h-5 text-green-400" />
            )}
        </div>
    );
};

export default CheckToggler;
