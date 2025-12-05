/**
 * @fileoverview Utility functions for the internationalization (i18n) package
 */

import localeConfig from './config.json' with { type: 'json' };
import type { Locale, LocaleConfig } from './types';

/**
 * Cache for loaded locales
 */
const localeCache: Map<string, Locale> = new Map();

/**
 * Gets a specific locale by its language code
 *
 * @param code Language code of the locale configuration to find (e.g., 'en', 'fr')
 * @returns Matching locale configuration, or undefined if not found
 */
const getLocale = (code: string): LocaleConfig | undefined =>
  localeConfig.find((locale: LocaleConfig): boolean => locale.code === code);

/**
 * Checks if a specific locale is enabled by its language code
 *
 * @param code Language code of the locale to check (e.g., 'en', 'fr')
 * @returns True if the locale is enabled, false otherwise
 */
const isLocaleEnabled = (code: string): boolean => {
  const locale: LocaleConfig | undefined = getLocale(code);
  return locale ? locale.enabled : false;
};

/**
 * Gets all available locale configurations
 *
 * @returns Array of available locale configurations
 */
const getAvailableLocales = (): ReadonlyArray<LocaleConfig> =>
  localeConfig.filter((locale: LocaleConfig): boolean => locale.enabled);

/**
 * Gets a list of all supported locale language codes
 *
 * @returns Array of locale language codes
 */
const getAvailableLocaleCodes = (): ReadonlyArray<string> =>
  getAvailableLocales().map((locale: LocaleConfig): string => locale.code);

/**
 * Gets a map of all supported locales, indexed by their language codes
 *
 * @returns Map of locale configurations, indexed by their language codes
 */
const getAvailableLocalesMap = (): Record<string, LocaleConfig> =>
  Object.fromEntries(
    getAvailableLocales().map((locale: LocaleConfig): [string, LocaleConfig] => [locale.code, locale])
  );

/**
 * Gets the default locale
 *
 * @returns The default locale
 * @throws Error If no default locale is configured
 */
const getDefaultLocale = (): LocaleConfig => {
  const defaultLocale: LocaleConfig | undefined = getAvailableLocales().find(
    (locale: LocaleConfig): boolean => locale.default
  );

  if (!defaultLocale) {
    throw new Error('I18N_ERROR: No Default Locale Configured');
  }

  return defaultLocale;
};

/**
 * Dynamically imports a locale by its language code
 * @remarks Uses a cache to avoid redundant imports
 *
 * @param code Locale language code to import messages for (e.g., 'en', 'fr')
 * @returns Promise resolving to the locale
 * @throws Error If the locale import fails or the imported data is invalid
 */
const importLocale = async (code: string): Promise<Locale> => {
  const cachedLocale: Locale | undefined = localeCache.get(code);

  if (cachedLocale) {
    return cachedLocale;
  }

  try {
    const locale: Locale = await import(`@legis-link/i18n/src/locales/${code}.json`, {
      with: { type: 'json' },
    });

    localeCache.set(code, locale);

    return locale;
  } catch (error: unknown) {
    const defaultLocale: LocaleConfig = getDefaultLocale();

    if (code !== defaultLocale.code) {
      console.warn(
        `I18N_WARNING: Failed To Load Locale '${code}', Falling Back To Default Locale '${defaultLocale.code}'`,
        error
      );

      return importLocale(defaultLocale.code);
    }

    throw new Error(
      `I18N_ERROR: Failed To Load Default Locale '${defaultLocale.code}': ${error instanceof Error ? error.message : String(error)}`
    );
  }
};

/**
 * Preloads a specific locale to avoid loading delays during runtime
 *
 * @param code Language code of the locale to preload (e.g., 'en', 'fr')
 * @returns Promise resolving when the locale is loaded
 */
const preloadLocale = async (code: string): Promise<void> => {
  await importLocale(code);
};

/**
 * Preloads all enabled locales
 * @remarks Improves performance by loading locales in the background
 *
 * @returns Promise resolving when all enabled locales are loaded
 */
const preloadEnabledLocales = async (): Promise<void> => {
  const enabledLocales: ReadonlyArray<LocaleConfig> = getAvailableLocales();

  await Promise.all(
    enabledLocales.map(async (enabledLocale: LocaleConfig): Promise<void> => await preloadLocale(enabledLocale.code))
  );
};

/**
 * Clears the locale cache
 * @remarks Useful for testing or forcing a reload of locale data
 *
 * @param [code] Optional language code of a specific locale to clear. If omitted, clears the entire cache
 */
const clearLocaleCache = (code?: string): void => {
  if (typeof code === 'string' && code.trim() !== '') {
    localeCache.delete(code);
  } else {
    localeCache.clear();
  }
};

/**
 * Formats a number according to the specified locale's rules
 *
 * @param code Language code of the locale to use for formatting (e.g., 'en', 'fr')
 * @param number Number to format
 * @param [options] Optional `Intl.NumberFormatOptions` to customize the formatting
 * @returns Formatted number as a string
 */
const formatNumber = (code: string, number: number, options?: Readonly<Intl.NumberFormatOptions>): string => {
  try {
    return new Intl.NumberFormat(code, options).format(number);
  } catch (error: unknown) {
    console.warn(`I18N_WARNING: Could Not Format Number With Locale '${code}', Falling Back To Default`, error);

    const defaultLocale: LocaleConfig = getDefaultLocale();
    return new Intl.NumberFormat(defaultLocale.code, options).format(number);
  }
};

export {
  getLocale,
  isLocaleEnabled,
  getAvailableLocales,
  getAvailableLocaleCodes,
  getAvailableLocalesMap,
  getDefaultLocale,
  importLocale,
  preloadLocale,
  preloadEnabledLocales,
  clearLocaleCache,
  formatNumber,
};
