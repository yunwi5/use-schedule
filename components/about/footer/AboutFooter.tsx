import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessages } from '@fortawesome/pro-duotone-svg-icons';

import { getContactLink } from '../../../utilities/link-utils';
import CustomMUIButton from '../../ui/buttons/CustomMUIButton';

const AboutFooter: React.FC = () => {
    return (
        <section className={'px-4 lg:px-12 xl:px-[6.5rem] flex flex-col gap-5'}>
            <h3 className={'text-xl sm:text-2xl xl:text-3xl'}>
                Have you enjoyed the introduction? Or, have you enjoyed using our app?
            </h3>
            <h4 className={'text-lg sm:text-xl'}>
                If you have any queries or feedback, feel free to contact us!
            </h4>
            <CustomMUIButton className="self-start">
                <Link href={getContactLink()}>
                    <a>
                        <FontAwesomeIcon icon={faMessages} className="mr-2" /> Send Conact
                        Message
                    </a>
                </Link>
            </CustomMUIButton>
        </section>
    );
};

export default AboutFooter;
