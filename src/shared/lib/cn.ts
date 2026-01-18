/**
 * Utility for combining class names
 * Filters out falsy values and joins with space
 *
 * @example
 * cn(styles.button, isActive && styles.active, isDark && styles.dark)
 * // => "button active" (if isActive is true, isDark is false)
 */
export const cn = (...classes: (string | false | undefined | null)[]): string =>
    classes.filter(Boolean).join(' ');
