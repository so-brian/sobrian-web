import { tokens } from "@fluentui/react-components"

export class ThemeUtility {
    public static getForegroundColor = () => {
        return tokens.colorPaletteSeafoamForeground2;
    }

    public static getBackgroundColor = () => {
        return tokens.colorPaletteSeafoamBackground2;
    }

    public static getActiveColor = () => {
        return tokens.colorPaletteSeafoamBorderActive;
    }
}