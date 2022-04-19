import React, { useCallback, useState } from "react";
import Image from "next/image";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrid2 } from "@fortawesome/pro-duotone-svg-icons";
import { faXmark, faCheck } from "@fortawesome/pro-solid-svg-icons";

import {
    CustomTheme,
    getStaticThemeImagePath,
    skyCloudTheme,
    ThemesList,
} from "../../../models/CustomTheme";
import { useAppSelector } from "../../../store/redux";
import Button from "../../ui/Button";
import classes from "./TodoThemeSelect.module.scss";

interface Props {
    onSelect(theme: CustomTheme): void;
}

const TodoThemeSelect: React.FC<Props> = (props) => {
    const { onSelect } = props;
    const [isSelecting, setIsSelecting] = useState(false);

    const currentTheme = useAppSelector((state) => state.todoList.currentActiveTheme);

    const themeSelectHandler = useCallback(
        (theme: CustomTheme) => {
            onSelect(theme);
            setIsSelecting(false);
        },
        [onSelect],
    );

    return (
        <ClickAwayListener onClickAway={() => setIsSelecting(false)}>
            <div className={classes.action}>
                <Button
                    onClick={() => setIsSelecting((prevState) => !prevState)}
                    className={`mr-1 flex justify-center items-center ${classes.btn} ${
                        currentTheme ? classes["btn-light"] : ""
                    }`}
                >
                    <FontAwesomeIcon icon={faGrid2} className={classes.icon} />
                    Theme
                </Button>
                {isSelecting && (
                    <div className="absolute rounded-sm min-w-[16rem] top-0 left-[100%] bg-white opacity-90 px-2 py-1">
                        <h3 className="flex justify-between items-center pl-2 text-xl border-b-2 border-blue-300 text-slate-700">
                            <span>Select theme</span>
                            <FontAwesomeIcon
                                icon={faXmark}
                                className="max-w-[1.2rem] text-rose-400 cursor-pointer transition-all hover:scale-110 hover:text-rose-500"
                                onClick={() => setIsSelecting(false)}
                            />
                        </h3>
                        <ul className={classes.list}>
                            {ThemesList.map((theme) => (
                                <li
                                    className={`${classes.item} ${
                                        currentTheme && currentTheme.name === theme.name
                                            ? classes["active-item"]
                                            : ""
                                    }`}
                                    key={theme.name}
                                    onClick={themeSelectHandler.bind(null, theme)}
                                >
                                    {currentTheme && theme.name === currentTheme.name && (
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            className={`${classes.icon} ${classes.check}`}
                                        />
                                    )}
                                    {!theme.img && (
                                        <div
                                            className={classes.background}
                                            style={{ backgroundColor: theme.background || "" }}
                                        ></div>
                                    )}
                                    {theme.img && (
                                        <Image
                                            src={getStaticThemeImagePath(theme)}
                                            alt={theme.name}
                                            layout="responsive"
                                            width="100%"
                                            height="100%"
                                            quality={60}
                                            placeholder="blur"
                                            blurDataURL={getStaticThemeImagePath(skyCloudTheme)}
                                        />
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </ClickAwayListener>
    );
};

export default TodoThemeSelect;
