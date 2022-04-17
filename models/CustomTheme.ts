export interface CustomTheme {
    textColor: string;
    borderColor: string;
    background: string;
    figureBackground: string; // Background of figure elements like box and panel
    figureTextColor: string;
    buttonBackground: string;
    backgroundImage?: string;
}

// Example
export const pinkTheme: CustomTheme = {
    background: "#fadde1",
    borderColor: "#fff0f3",
    figureBackground: "#efc3e6",
    figureTextColor: "#f7f7f7",
    textColor: "#d7b9d5",
    buttonBackground: "#fbb1bd",
};
