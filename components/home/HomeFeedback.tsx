import Image from 'next/image';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessages, faQuoteLeft } from '@fortawesome/pro-duotone-svg-icons';

import { Size, Theme } from '../../models/design-models';
import Button from '../ui/buttons/Button';
import { getHomeImagePath } from './helper';
import classes from './Home.module.scss';

const HomeFeedback: React.FC = () => {
    const router = useRouter();

    const quoteIconClass = `text-blue-600 mr-2 max-w-[1.3rem] max-h-[1.2rem] ${classes.icon}`;

    return (
        <section className={`my-6 py-6 px-6 ${classes.feedback}`}>
            <h1 className={`text-slate-600 capitalize ${classes.heading}`}>
                Your feedback helps!
            </h1>
            <div className={classes['img-wrapper']}>
                <Image
                    src={getHomeImagePath('laptop-code.jpg')}
                    alt="App Development"
                    height="50"
                    width="70"
                    layout="responsive"
                    className={classes['feedback-img']}
                />
            </div>
            <div
                className={`text-slate-600 pr-4 text-lg flex flex-col gap-2 ${classes.content}`}
            >
                <p>
                    <FontAwesomeIcon icon={faQuoteLeft} className={quoteIconClass} />
                    If you want to give some feedback on our app services, feel free to send us
                    messages!
                </p>
                <p>
                    <FontAwesomeIcon icon={faQuoteLeft} className={quoteIconClass} />
                    We will always listen to our user&apos;s voices and will improve our app to
                    best suit your needs.
                </p>
                <div className="mt-6 xl:mt-10">
                    <Button
                        theme={Theme.TERTIARY}
                        size={Size.MEDIUM_LARGE}
                        onClick={() => router.push('/contact')}
                    >
                        <FontAwesomeIcon
                            icon={faMessages}
                            className={`mr-3 max-w-[1.5rem] ${classes.icon}`}
                        />
                        Contact Us
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default HomeFeedback;
