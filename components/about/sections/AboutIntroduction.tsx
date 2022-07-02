import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
    DashboardSection,
    DataAnalysisSection,
    RecurringSection,
    TemplateSection,
    TypeWriterSection,
} from '../../../constants/about-sections';
import { AboutTheme } from '../../../models/design-models';
import classes from '../About.module.scss';

const IMAGE_LINK = '/about-images/daily-work.jpg';

const AboutIntroduction = () => {
    return (
        <section
            className={
                '2xl:px-8 max-w-[35rem] lg:max-w-none flex flex-col lg:flex-row gap-0 lg:gap-8 items-start lg:items-center'
            }
        >
            <div className="min-w-[100%] xs:min-w-[80%] lg:min-w-[40%] self-center block flex-1">
                <Image
                    src={IMAGE_LINK}
                    alt={'Daily Scheduling'}
                    width="400"
                    height="400"
                    layout="responsive"
                    objectFit="cover"
                />
            </div>
            <div className={'flex flex-col gap-3'}>
                <h2 className={'flex text-3xl capitalize'}>
                    About our schedule booster app{' '}
                    <small className={'ml-2 text-pink-600 text-[60%]'}>BETA</small>
                </h2>
                <ul className={'flex flex-col gap-2'}>
                    {paragraphs.map((part, idx) => (
                        <li key={idx} className={classes[`section-${part.theme}`]}>
                            <h4 className={`text-xl ${part.headingClass}`}>{part.heading}</h4>
                            <p className={classes.para}>{part.text}</p>
                        </li>
                    ))}
                </ul>
                <a
                    href={TypeWriterSection.link}
                    className={
                        'inline-block text-center xl:mt-3 px-5 py-3 rounded-sm bg-white text-blue-700 hover:bg-blue-600 hover:text-blue-50 shadow-lg hover:shadow-2xl'
                    }
                >
                    Find Out More
                </a>
            </div>
        </section>
    );
};

const paragraphs = [
    {
        theme: AboutTheme.SKY,
        heading: 'Who made this?',
        text: 'This app was created by a UOA CS Student who works on creating web applications for fun.',
        headingClass: 'text-sky-600',
    },
    {
        theme: AboutTheme.BLUE,
        heading: 'Motivation',
        text: (
            <>
                The motivation to create a project that does not only support planning, but
                also tons of utility & visualization functionalities like{' '}
                <Link href={DashboardSection.link}>dashboard</Link> and{' '}
                <Link href={DataAnalysisSection.link}>data analytics</Link>.
            </>
        ),
        headingClass: 'text-blue-600',
    },
    {
        theme: AboutTheme.INDIGO,
        heading: 'Our goals',
        text: (
            <>
                Our primary goal is to create schedular application for people to minimize
                their time spending on planning (with{' '}
                <Link href={RecurringSection.link}>recurring schedules</Link> &{' '}
                <Link href={TemplateSection.link}>template tables</Link>), and maximize the
                visual satisfaction.
            </>
        ),
        headingClass: 'text-indigo-600',
    },
];

export default AboutIntroduction;
