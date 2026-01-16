/**
 * Debounce function to limit how often a function can be called
 * Useful for search inputs and other high-frequency events
 *
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
// NOTE: Disabled to avoid excessive API requests while the daily limit is low.
// export const debounce = <T extends (...args: never[]) => void>(
//     func: T,
//     delay: number
// ): ((...args: Parameters<T>) => void) => {
//     let timer: NodeJS.Timeout;
//
//     return (...args: Parameters<T>) => {
//         clearTimeout(timer);
//         timer = setTimeout(() => func(...args), delay);
//     };
// };
