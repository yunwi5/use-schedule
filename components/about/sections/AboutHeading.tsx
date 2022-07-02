import { AppProperty } from '../../../constants/global-constants';

const AboutHeading = () => {
    return (
        <div className="mb-5 lg:mb-10 pl-[11%] sm:pl-[16%] md:pl-0 text-left md:text-center">
            <h1 className="text-3xl lg:text-4xl text-slate-600">
                About <span className={'text-sky-600'}>{AppProperty.APP_NAME}</span> Services
            </h1>
        </div>
    );
};

export default AboutHeading;
