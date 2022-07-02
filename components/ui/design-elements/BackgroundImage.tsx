import Image from 'next/image';

interface Props {
    src: string;
    alt?: string;
    opacity?: number | string;
}

const BackgroundImage: React.FC<Props> = ({ src, alt, opacity }) => {
    return (
        <div className="bg-background" style={opacity ? { opacity } : undefined}>
            <Image src={src} alt={alt ?? 'Background image'} objectFit="cover" layout="fill" />
        </div>
    );
};

export default BackgroundImage;
