import { faArrowUp } from '@fortawesome/pro-light-svg-icons';
import { faCheck } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { AboutStartSection } from '../../../../constants/about-sections';
import { Theme } from '../../../../models/design-models';
import classes from '../../About.module.scss';

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

    return (
        <div
            id={id}
            className={`px-8 grid grid-cols-2 gap-y-8 gap-x-8 ${classes['video-intro']}`}
        >
            <h2 className={'relative uppercase col-span-2 text-3xl text-center'}>
                {title}
                <a
                    href={AboutStartSection.link}
                    className="absolute top-[50%] -translate-y-[50%] right-3"
                >
                    <FontAwesomeIcon
                        icon={faArrowUp}
                        className={`cursor-pointer text-3xl transition-all hover:scale-y-125`}
                    />
                </a>
            </h2>
            <video
                src={videoSrc}
                className={'rounded-sm shadow-lg'}
                controls
                autoPlay
                muted
                loop
            >
                <source src={videoSrc}></source>
            </video>
            <div className={'flex flex-col gap-5'}>
                <h3 className={`text-2xl ${classes.heading}`}>{heading}</h3>
                <ul className={'flex flex-col gap-3 text-lg'}>
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
