// UI Model
export enum ItemsView {
    LIST = 'List',
    TABLE = 'Table',
}

export interface FeatureBox {
    heading: string | JSX.Element;
    image: ImageConfig;
    paragraphs: Array<string | JSX.Element>;
}

export interface ImageConfig {
    src: string;
    width?: string | number;
    height?: string | number;
    layout?: 'responsive' | 'fill';
    objectFit?: 'cover' | 'contain';
}
