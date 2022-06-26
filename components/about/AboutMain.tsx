import React from 'react';
import { AppProperty } from '../../constants/global-constants';
import BackgroundImage from '../ui/design-elements/BackgroundImage';
import AboutNavigation from './nav/AboutNavigation';

const AboutMain = () => {
    return (
        <div className={'min-h-[100%]'}>
            <BackgroundImage src="/bg-images/bg-work.jpg" alt="About Us" opacity={0.35} />
            <main className="px-3 sm:px-4 lg:px-6 xl:px-8 pt-8 pb-10 text-slate-700">
                <div className="mb-5">
                    <h1 className="mb-3 text-4xl text-slate-600">
                        About <span className={'text-sky-600'}>{AppProperty.APP_NAME}</span>{' '}
                        Services
                    </h1>
                    <h3 className={'text-xl'}>
                        Organized documentation for all features & functionalities
                    </h3>
                </div>
                <AboutNavigation />
            </main>
        </div>
    );
};

export default AboutMain;
