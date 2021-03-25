/**
 * Применение цветовой схемы.
 * На body вешается класс с именем темы в названии.
 * Если темы нет, применяется дефолтная тема.
 * @param {string} theme - Цветовая схема
 *
 */
declare const useTheme: (theme?: string | undefined) => void;
export default useTheme;
