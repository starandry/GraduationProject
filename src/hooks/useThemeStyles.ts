import { useSelector } from 'react-redux';
import { RootState } from '../stores/store';

/**
 * Custom hook for applying theme-based CSS classes
 * Automatically handles dark/light mode styling
 *
 * @param styles - CSS module object
 * @returns Function to get theme-aware class names
 *
 * @example
 * const getThemeClass = useThemeStyles(styles);
 * const titleClass = getThemeClass('title');
 * // Returns: styles.title (dark) or "styles.title styles.titleLight" (light)
 */
export const useThemeStyles = (styles: Record<string, string>) => {
    const isDark = useSelector((state: RootState) => state.theme.isDark);

    /**
     * Get theme-aware class name
     * @param baseClass - Base class name
     * @param lightClassOrSuffix - Optional light-mode class key OR suffix (defaults to 'Light')
     */
    return (baseClass: string, lightClassOrSuffix: string = 'Light'): string => {
        const base = styles[baseClass] || '';
        if (isDark) {
            return base;
        }
        // Backward-compatible: allow passing the exact light class key (e.g. 'lightTitle'),
        // or a suffix (e.g. 'Light' => 'titleLight').
        const explicitLightClass = styles[lightClassOrSuffix] || '';
        if (explicitLightClass) {
            return base ? `${base} ${explicitLightClass}` : explicitLightClass;
        }

        const lightClass = styles[`${baseClass}${lightClassOrSuffix}`] || '';
        return lightClass ? `${base} ${lightClass}` : base;
    };
};
