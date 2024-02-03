import "styled-components";
import { lightTheme } from "../../styles/themes/light";

export type ThemeType = typeof lightTheme;
export type ThemeTypeColors = typeof lightTheme.colors;
export type ThemeTypeRadii = typeof lightTheme.radii;

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
