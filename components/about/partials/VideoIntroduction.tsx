import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/pro-light-svg-icons';
import { faCheck } from '@fortawesome/pro-solid-svg-icons';

import { AboutStartSection } from '../../../constants/about-sections';
import { Theme } from '../../../models/design-models';
import classes from '../About.module.scss';
import { checkIsMobile } from '../../../utilities/device-util';

interface Props {
    title: string | JSX.Element;
    id: string;
    heading: string | JSX.Element;
    checkList: Array<string | JSX.Element>;
    videoSrc: string;
    theme?: Theme;
}

const VideoIntroduction: React.FC<Props> = (props) => {
    const { title, heading, id, checkList, videoSrc } = props;
    const [isAutoplay, setIsAutoplay] = useState(false);

    // if it is mobile screen size, do not auto play
    useEffect(() => {
        const autoplay = !checkIsMobile();
        setIsAutoplay(autoplay);
    }, []);

    return (
        <div
            id={id}
            className={`px-4 lg:px-8 xl:px-14 grid grid-cols-1 lg:grid-cols-2 gap-y-8 gap-x-8 justify-center ${classes['video-intro']}`}
        >
            <h2
                className={
                    'justify-self-stretch relative uppercase col-span-2 text-xl sm:text-2xl md:text-3xl text-center'
                }
            >
                {title}
                <a
                    href={AboutStartSection.link}
                    className="absolute top-[50%] -translate-y-[50%] right-3"
                >
                    <FontAwesomeIcon
                        icon={faArrowUp}
                        className={`cursor-pointer text-2xl lg:text-3xl transition-all hover:scale-y-125`}
                    />
                </a>
            </h2>
            <div className={`col-span-2 lg:col-span-1 ${classes['video-container']}`}>
                <video
                    src={videoSrc}
                    className={'rounded-sm shadow-lg'}
                    controls
                    autoPlay={isAutoplay}
                    muted
                    loop
                >
                    <source src={videoSrc}></source>
                </video>
            </div>
            <div className={`flex flex-col gap-5 ${classes['video-explanation']}`}>
                <h3 className={`text-lg md:text-xl lg:text-2xl ${classes.heading}`}>
                    {heading}
                </h3>
                <ul className={'flex flex-col gap-3 xl:text-lg'}>
                    {checkList.map((check, idx) => (
                        <li key={idx}>
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={`text-emerald-600 text-[1.2rem] mr-2 ${classes.icon}`}
                            />
                            {check}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default VideoIntroduction;
