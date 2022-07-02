import { AppProperty } from '../../../constants/global-constants';

const AboutHeading = () => {
    return (
        <div className="mb-10 pl-[10%] text-left sm:text-center">
            <h1 className="mb-3 text-3xl lg:text-4xl text-slate-600">
                About <span className={'text-sky-600'}>{AppProperty.APP_NAME}</span> Services
            </h1>
        </div>
    );
};

export default AboutHeading;
