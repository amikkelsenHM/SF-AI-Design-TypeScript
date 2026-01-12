export declare const colors: {
    readonly primary: {
        readonly 100: "#e9e0fb";
        readonly 200: "#c9b1f4";
        readonly 300: "#ac80ed";
        readonly 400: "#924ae4";
        readonly 500: "#6b29ae";
        readonly 600: "#41166d";
        readonly 700: "#1a0531";
    };
    readonly secondary: {
        readonly 100: "#ffecf2";
        readonly 200: "#ffbed6";
        readonly 300: "#ff7eb6";
        readonly 400: "#fb0098";
        readonly 500: "#ba0070";
        readonly 600: "#7d0049";
        readonly 700: "#450026";
    };
    readonly grey: {
        readonly 100: "#e5e4e6";
        readonly 200: "#bdbcc0";
        readonly 300: "#97959c";
        readonly 400: "#737079";
        readonly 500: "#504e55";
        readonly 600: "#2f2e33";
        readonly 700: "#111113";
        readonly 900: "#120B0D";
    };
    readonly tertiary: {
        readonly 100: "#fdcfd0";
        readonly 200: "#fb9699";
        readonly 300: "#fa4d56";
        readonly 400: "#ce1628";
        readonly 500: "#8f0c18";
        readonly 600: "#54040a";
        readonly 700: "#2b0103";
    };
    readonly quaternary: {
        readonly 100: "#ffd9d9";
        readonly 200: "#ffa0a0";
        readonly 300: "#ff5b5b";
        readonly 400: "#e10000";
        readonly 500: "#9f0000";
        readonly 600: "#620000";
        readonly 700: "#2d0000";
    };
    readonly quinary: {
        readonly 100: "#76ff9a";
        readonly 200: "#00d961";
        readonly 300: "#00ad4c";
        readonly 400: "#008338";
        readonly 500: "#005c25";
        readonly 600: "#003713";
        readonly 700: "#001504";
    };
    readonly senary: {
        readonly 100: "#ccff6a";
        readonly 200: "#a2d700";
        readonly 300: "#82ad00";
        readonly 400: "#638500";
        readonly 500: "#465f00";
        readonly 600: "#2b3c00";
        readonly 700: "#121b00";
    };
    readonly septenary: {
        readonly 100: "#ceff0c";
        readonly 200: "#abd400";
        readonly 300: "#89ab00";
        readonly 400: "#688300";
        readonly 500: "#4a5d00";
        readonly 600: "#2d3a00";
        readonly 700: "#131a00";
    };
    readonly octonary: {
        readonly 100: "#b1fffb";
        readonly 200: "#1eeae4";
        readonly 300: "#16bfba";
        readonly 400: "#0f9692";
        readonly 500: "#086e6b";
        readonly 600: "#034947";
        readonly 700: "#012725";
    };
    readonly brand: {
        readonly mediumOrchid: "#CF8BFF";
        readonly deepPurple: "#6B29AE";
        readonly chinaPink: "#D8749D";
        readonly greyPurple: "#674A86";
        readonly hanBlue: "#5865C6";
        readonly brightBlue: "#1686E8";
    };
    readonly surface: {
        readonly dark: "#100919";
        readonly darkContrast: "#292134";
        readonly darkProgress: "#312A39";
        readonly light: "#FFFFFF";
    };
    readonly ui: {
        readonly onNeutral40: "#222222";
        readonly appliedOnPrimary: "#F8F8F8";
    };
    readonly onSurface: {
        readonly dark: "#EEEEEE";
        readonly light: "#222222";
        readonly darkContrast: "#36274A";
        readonly darkSubtle: "#1D1825";
        readonly darkDisabled: "#525252";
    };
    readonly border: {
        readonly dark: "#1A1520";
        readonly onDark: "#EEEEEE";
        readonly onDarkContrast: "#36274A";
        readonly onDarkSubtle: "#1D1825";
        readonly onDarkDisabled: "#525252";
        readonly focus: "#1686E8";
        readonly disabled: "#e6e6e6";
    };
    readonly borderSemantic: {
        readonly errorDark: "#7F000F";
        readonly warningDark: "#654E00";
        readonly successDark: "#057023";
    };
    readonly surfaceSemantic: {
        readonly errorDark: "#CF0019";
        readonly warningDark: "#DCAA00";
        readonly successDark: "#00B55F";
        readonly successBold: "#048273";
    };
    readonly onSurfaceSemantic: {
        readonly errorDark: "#FF8594";
        readonly warningDark: "#FFDB62";
        readonly successDark: "#B0FFB8";
    };
    readonly dataviz: {
        readonly 1: "#8a3ffc";
        readonly 2: "#5a3cd3";
        readonly 3: "#4589ff";
        readonly 4: "#ff7eb6";
        readonly 5: "#fa4d56";
        readonly 6: "#d12771";
        readonly 7: "#76ff9a";
        readonly 8: "#82ad00";
        readonly 9: "#009d9a";
        readonly 10: "#086e6b";
        readonly 11: "#19fcf8";
        readonly 12: "#0072c3";
        readonly 13: "#b98c00";
        readonly 14: "#ffe100";
        readonly 15: "#fddc69";
    };
};
export declare const typography: {
    readonly fontFamily: {
        readonly ibmPlexSans: "\"IBM Plex Sans\", sans-serif";
        readonly nbArchitekt: "\"NB Architekt Std\", sans-serif";
        readonly helvetica: "\"Helvetica\", sans-serif";
    };
    readonly fontWeight: {
        readonly regular: 400;
        readonly medium: 500;
        readonly bold: 700;
    };
    readonly fontSize: {
        readonly 8: "8px";
        readonly 10: "10px";
        readonly 12: "12px";
        readonly 14: "14px";
        readonly 16: "16px";
        readonly 18: "18px";
        readonly 28: "28px";
        readonly 35: "35px";
        readonly 36: "36px";
        readonly 55: "55px";
    };
    readonly lineHeight: {
        readonly 10: "10px";
        readonly 12: "12px";
        readonly 13: "13px";
        readonly 14: "14px";
        readonly 17: "17px";
        readonly 18: "18px";
        readonly 22: "22px";
        readonly 25: "25px";
        readonly 34: "34px";
        readonly 40: "40px";
        readonly 42: "42px";
        readonly 55: "55px";
    };
    readonly letterSpacing: {
        readonly neg5: "-0.2px";
        readonly 0: "0px";
    };
};
export type ColorToken = typeof colors;
export type TypographyToken = typeof typography;
export declare const cssVars: {
    readonly color: {
        readonly primary100: "var(--color-primary-100)";
        readonly primary200: "var(--color-primary-200)";
        readonly primary300: "var(--color-primary-300)";
        readonly primary400: "var(--color-primary-400)";
        readonly primary500: "var(--color-primary-500)";
        readonly primary600: "var(--color-primary-600)";
        readonly primary700: "var(--color-primary-700)";
        readonly secondary100: "var(--color-secondary-100)";
        readonly secondary200: "var(--color-secondary-200)";
        readonly secondary300: "var(--color-secondary-300)";
        readonly secondary400: "var(--color-secondary-400)";
        readonly secondary500: "var(--color-secondary-500)";
        readonly secondary600: "var(--color-secondary-600)";
        readonly secondary700: "var(--color-secondary-700)";
        readonly grey100: "var(--color-grey-100)";
        readonly grey200: "var(--color-grey-200)";
        readonly grey300: "var(--color-grey-300)";
        readonly grey400: "var(--color-grey-400)";
        readonly grey500: "var(--color-grey-500)";
        readonly grey600: "var(--color-grey-600)";
        readonly grey700: "var(--color-grey-700)";
        readonly grey900: "var(--color-grey-900)";
        readonly surfaceDark: "var(--color-surface-dark)";
        readonly surfaceDarkContrast: "var(--color-surface-dark-contrast)";
        readonly surfaceLight: "var(--color-surface-light)";
        readonly onSurfaceDark: "var(--color-on-surface-dark)";
        readonly onSurfaceLight: "var(--color-on-surface-light)";
        readonly borderDark: "var(--color-border-dark)";
        readonly borderFocus: "var(--color-border-focus)";
    };
    readonly font: {
        readonly familyIbmPlex: "var(--font-family-ibm-plex-sans)";
        readonly familyNbArchitekt: "var(--font-family-nb-architekt)";
        readonly familyHelvetica: "var(--font-family-helvetica)";
        readonly weightRegular: "var(--font-weight-regular)";
        readonly weightMedium: "var(--font-weight-medium)";
        readonly weightBold: "var(--font-weight-bold)";
    };
};
export declare const tokens: {
    readonly colors: {
        readonly primary: {
            readonly 100: "#e9e0fb";
            readonly 200: "#c9b1f4";
            readonly 300: "#ac80ed";
            readonly 400: "#924ae4";
            readonly 500: "#6b29ae";
            readonly 600: "#41166d";
            readonly 700: "#1a0531";
        };
        readonly secondary: {
            readonly 100: "#ffecf2";
            readonly 200: "#ffbed6";
            readonly 300: "#ff7eb6";
            readonly 400: "#fb0098";
            readonly 500: "#ba0070";
            readonly 600: "#7d0049";
            readonly 700: "#450026";
        };
        readonly grey: {
            readonly 100: "#e5e4e6";
            readonly 200: "#bdbcc0";
            readonly 300: "#97959c";
            readonly 400: "#737079";
            readonly 500: "#504e55";
            readonly 600: "#2f2e33";
            readonly 700: "#111113";
            readonly 900: "#120B0D";
        };
        readonly tertiary: {
            readonly 100: "#fdcfd0";
            readonly 200: "#fb9699";
            readonly 300: "#fa4d56";
            readonly 400: "#ce1628";
            readonly 500: "#8f0c18";
            readonly 600: "#54040a";
            readonly 700: "#2b0103";
        };
        readonly quaternary: {
            readonly 100: "#ffd9d9";
            readonly 200: "#ffa0a0";
            readonly 300: "#ff5b5b";
            readonly 400: "#e10000";
            readonly 500: "#9f0000";
            readonly 600: "#620000";
            readonly 700: "#2d0000";
        };
        readonly quinary: {
            readonly 100: "#76ff9a";
            readonly 200: "#00d961";
            readonly 300: "#00ad4c";
            readonly 400: "#008338";
            readonly 500: "#005c25";
            readonly 600: "#003713";
            readonly 700: "#001504";
        };
        readonly senary: {
            readonly 100: "#ccff6a";
            readonly 200: "#a2d700";
            readonly 300: "#82ad00";
            readonly 400: "#638500";
            readonly 500: "#465f00";
            readonly 600: "#2b3c00";
            readonly 700: "#121b00";
        };
        readonly septenary: {
            readonly 100: "#ceff0c";
            readonly 200: "#abd400";
            readonly 300: "#89ab00";
            readonly 400: "#688300";
            readonly 500: "#4a5d00";
            readonly 600: "#2d3a00";
            readonly 700: "#131a00";
        };
        readonly octonary: {
            readonly 100: "#b1fffb";
            readonly 200: "#1eeae4";
            readonly 300: "#16bfba";
            readonly 400: "#0f9692";
            readonly 500: "#086e6b";
            readonly 600: "#034947";
            readonly 700: "#012725";
        };
        readonly brand: {
            readonly mediumOrchid: "#CF8BFF";
            readonly deepPurple: "#6B29AE";
            readonly chinaPink: "#D8749D";
            readonly greyPurple: "#674A86";
            readonly hanBlue: "#5865C6";
            readonly brightBlue: "#1686E8";
        };
        readonly surface: {
            readonly dark: "#100919";
            readonly darkContrast: "#292134";
            readonly darkProgress: "#312A39";
            readonly light: "#FFFFFF";
        };
        readonly ui: {
            readonly onNeutral40: "#222222";
            readonly appliedOnPrimary: "#F8F8F8";
        };
        readonly onSurface: {
            readonly dark: "#EEEEEE";
            readonly light: "#222222";
            readonly darkContrast: "#36274A";
            readonly darkSubtle: "#1D1825";
            readonly darkDisabled: "#525252";
        };
        readonly border: {
            readonly dark: "#1A1520";
            readonly onDark: "#EEEEEE";
            readonly onDarkContrast: "#36274A";
            readonly onDarkSubtle: "#1D1825";
            readonly onDarkDisabled: "#525252";
            readonly focus: "#1686E8";
            readonly disabled: "#e6e6e6";
        };
        readonly borderSemantic: {
            readonly errorDark: "#7F000F";
            readonly warningDark: "#654E00";
            readonly successDark: "#057023";
        };
        readonly surfaceSemantic: {
            readonly errorDark: "#CF0019";
            readonly warningDark: "#DCAA00";
            readonly successDark: "#00B55F";
            readonly successBold: "#048273";
        };
        readonly onSurfaceSemantic: {
            readonly errorDark: "#FF8594";
            readonly warningDark: "#FFDB62";
            readonly successDark: "#B0FFB8";
        };
        readonly dataviz: {
            readonly 1: "#8a3ffc";
            readonly 2: "#5a3cd3";
            readonly 3: "#4589ff";
            readonly 4: "#ff7eb6";
            readonly 5: "#fa4d56";
            readonly 6: "#d12771";
            readonly 7: "#76ff9a";
            readonly 8: "#82ad00";
            readonly 9: "#009d9a";
            readonly 10: "#086e6b";
            readonly 11: "#19fcf8";
            readonly 12: "#0072c3";
            readonly 13: "#b98c00";
            readonly 14: "#ffe100";
            readonly 15: "#fddc69";
        };
    };
    readonly typography: {
        readonly fontFamily: {
            readonly ibmPlexSans: "\"IBM Plex Sans\", sans-serif";
            readonly nbArchitekt: "\"NB Architekt Std\", sans-serif";
            readonly helvetica: "\"Helvetica\", sans-serif";
        };
        readonly fontWeight: {
            readonly regular: 400;
            readonly medium: 500;
            readonly bold: 700;
        };
        readonly fontSize: {
            readonly 8: "8px";
            readonly 10: "10px";
            readonly 12: "12px";
            readonly 14: "14px";
            readonly 16: "16px";
            readonly 18: "18px";
            readonly 28: "28px";
            readonly 35: "35px";
            readonly 36: "36px";
            readonly 55: "55px";
        };
        readonly lineHeight: {
            readonly 10: "10px";
            readonly 12: "12px";
            readonly 13: "13px";
            readonly 14: "14px";
            readonly 17: "17px";
            readonly 18: "18px";
            readonly 22: "22px";
            readonly 25: "25px";
            readonly 34: "34px";
            readonly 40: "40px";
            readonly 42: "42px";
            readonly 55: "55px";
        };
        readonly letterSpacing: {
            readonly neg5: "-0.2px";
            readonly 0: "0px";
        };
    };
    readonly cssVars: {
        readonly color: {
            readonly primary100: "var(--color-primary-100)";
            readonly primary200: "var(--color-primary-200)";
            readonly primary300: "var(--color-primary-300)";
            readonly primary400: "var(--color-primary-400)";
            readonly primary500: "var(--color-primary-500)";
            readonly primary600: "var(--color-primary-600)";
            readonly primary700: "var(--color-primary-700)";
            readonly secondary100: "var(--color-secondary-100)";
            readonly secondary200: "var(--color-secondary-200)";
            readonly secondary300: "var(--color-secondary-300)";
            readonly secondary400: "var(--color-secondary-400)";
            readonly secondary500: "var(--color-secondary-500)";
            readonly secondary600: "var(--color-secondary-600)";
            readonly secondary700: "var(--color-secondary-700)";
            readonly grey100: "var(--color-grey-100)";
            readonly grey200: "var(--color-grey-200)";
            readonly grey300: "var(--color-grey-300)";
            readonly grey400: "var(--color-grey-400)";
            readonly grey500: "var(--color-grey-500)";
            readonly grey600: "var(--color-grey-600)";
            readonly grey700: "var(--color-grey-700)";
            readonly grey900: "var(--color-grey-900)";
            readonly surfaceDark: "var(--color-surface-dark)";
            readonly surfaceDarkContrast: "var(--color-surface-dark-contrast)";
            readonly surfaceLight: "var(--color-surface-light)";
            readonly onSurfaceDark: "var(--color-on-surface-dark)";
            readonly onSurfaceLight: "var(--color-on-surface-light)";
            readonly borderDark: "var(--color-border-dark)";
            readonly borderFocus: "var(--color-border-focus)";
        };
        readonly font: {
            readonly familyIbmPlex: "var(--font-family-ibm-plex-sans)";
            readonly familyNbArchitekt: "var(--font-family-nb-architekt)";
            readonly familyHelvetica: "var(--font-family-helvetica)";
            readonly weightRegular: "var(--font-weight-regular)";
            readonly weightMedium: "var(--font-weight-medium)";
            readonly weightBold: "var(--font-weight-bold)";
        };
    };
};
export default tokens;
//# sourceMappingURL=tokens.d.ts.map