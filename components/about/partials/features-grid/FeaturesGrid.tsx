import { faInfo } from '@fortawesome/pro-regular-svg-icons';
import { faAngleRight } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React from 'react';
import { FeatureBox } from '../../../../models/ui-models';
import classes from '../../About.module.scss';

interface Props {
    features: FeatureBox[];
}

const FeaturesGrid: React.FC<Props> = ({ features }) => {
    return (
        <div
            className={`mt-5 xl:px-20 grid justify-items-center grid-cols-1 lg:grid-cols-2 gap-x-2 gap-y-10 ${classes['features-grid']}`}
        >
            <h5 className={`col-span-2 text-lg text-center font-semibold ${classes.sub}`}>
                Interesting parts to note
            </h5>
            {features.map((feature, idx) => (
                <article
                    key={idx}
                    className={`xl:max-w-[90%] relative py-3 px-3 transition-all shadow-md hover:shadow-lg rounded-md flex flex-col gap-2 ${classes.feature}`}
                >
                    <h3 className={`text-2xl mb-1 text-center ${classes.heading}`}>
                        {feature.heading}
                    </h3>
                    <Image
                        alt={`About image`}
                        src={feature.image.src}
                        width={feature.image.width ?? '100%'}
                        height={feature.image.height ?? 50}
                        layout={feature.image.layout ?? 'responsive'}
                        objectFit={feature.image.objectFit ?? 'contain'}
                    />
                    <ul className="px-2 flex flex-col items-center gap-2">
                        {feature.paragraphs.map((p, idx) => (
                            <li key={idx} className="px-4 flex gap-2">
                                <FontAwesomeIcon
                                    icon={faInfo}
                                    className={`${classes.icon} translate-y-1`}
                                />{' '}
                                <span>{p}</span>
                            </li>
                        ))}
                    </ul>
                </article>
            ))}
        </div>
    );
};

export default FeaturesGrid;
