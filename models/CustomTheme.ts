export interface CustomTheme {
    name: string;
    img?: string;
    background?: string;
    textColor?: string;
    borderColor?: string;
    figureBackground?: string; // Background of figure elements like box and panel
    buttonBackground?: string;
}

// Example
export const skyCloudTheme: CustomTheme = {
    name: 'Sky Cloud',
    img: 'sky-cloud.jpg',
    textColor: '#fff',
};

export const cloudRainbowTheme: CustomTheme = {
    name: 'Cloud Rainbow',
    img: 'cloud-rainbow.jpg',
    textColor: '#fff',
};

export const bigBalloonTheme: CustomTheme = {
    name: 'Sky Balloon',
    img: 'big-balloon.jpg',
    textColor: '#fff',
};

export const mountainLakeTheme: CustomTheme = {
    name: 'Mountain Lake',
    img: 'mountain-lake.jpg',
    background: '',
    textColor: '#fff',
};

export const beachCloudyTheme: CustomTheme = {
    name: 'Cloudy Beach',
    img: 'beach-cloudy.jpg',
    background: '',
    textColor: '#fff',
};

export const beachSunsetTheme: CustomTheme = {
    name: 'Beach Sunset',
    img: 'beach-sunset.jpg',
    textColor: '#fff',
};

export const cityBridgeTheme: CustomTheme = {
    name: 'City Bridge',
    img: 'city-bridge.jpg',
    textColor: '#fff',
};

export const eiffelTowerTheme: CustomTheme = {
    name: 'Eiffel Tower',
    img: 'eiffel-tower.jpg',
    textColor: '#fff',
};

export const sydneyTheme: CustomTheme = {
    name: 'Sydney',
    img: 'sydney.jpg',
    textColor: '#fff',
};

export const londonTheme: CustomTheme = {
    name: 'London',
    img: 'london.jpg',
    textColor: '#fff',
};

export const berlinTheme: CustomTheme = {
    name: 'Berlin',
    img: 'berlin.jpg',
    textColor: '#fff',
};

export const oceanCleanTheme: CustomTheme = {
    name: 'Clean Ocean',
    img: 'ocean-clean.jpg',
    textColor: '#fff',
};

export const philadelphiaCityHallTheme: CustomTheme = {
    name: 'Philadelphia City Hall',
    img: 'philadelphia-city-hall.jpg',
    textColor: '#fff',
};

export const metropolitanSkylineTheme: CustomTheme = {
    name: 'Metropolitan Skyline',
    img: 'metropolitan-skyline.jpg',
    textColor: '#fff',
};

// #e1e1e1
const defaultTheme: CustomTheme = { name: 'default', background: '#e1e1e1' };

export const ThemesList: CustomTheme[] = [
    defaultTheme,
    skyCloudTheme,
    cloudRainbowTheme,
    bigBalloonTheme,
    mountainLakeTheme,
    beachCloudyTheme,
    beachSunsetTheme,
    cityBridgeTheme,
    eiffelTowerTheme,
    sydneyTheme,
    londonTheme,
    oceanCleanTheme,
    philadelphiaCityHallTheme,
    berlinTheme,
    metropolitanSkylineTheme,
];

export function getStaticThemeImagePath(theme: CustomTheme | null) {
    if (!theme || !theme.img) return '';
    return `/theme-photos/${theme.img}`;
}

export function isDefaultTheme(theme: CustomTheme | null) {
    if (theme === null) return true;
    if (theme.name === defaultTheme.name) return true;
    return false;
}
