/**
 * @fileoverview Core Internationalization (i18n) Utility Functions For The Application
 */

import localeConfigs from './config.json' with { type: 'json' };
import type { Locale, LocaleConfig } from './types';

/**
 * Cache For Loaded Locales.
 */
const localeCache: Map<string, Locale> = new Map();

/**
 * Gets The Default Locale Configuration.
 *
 * @returns The Default Locale Configuration
 * @throws Error If No Default Locale Is Configured
 */
const getDefaultLocaleConfig = (): LocaleConfig => {
  const defaultLocaleConfig: LocaleConfig | undefined = localeConfigs.find(
    (localeConfig: LocaleConfig): boolean => localeConfig.default
  );

  if (!defaultLocaleConfig) {
    throw new Error('I18N_ERROR: No Default Locale Configured');
  }

  return defaultLocaleConfig;
};

/**
 * Gets A Specific Locale Configuration By Its Language Code.
 *
 * @param languageCode Language Code Of The Locale Configuration To Find (e.g., 'en', 'fr')
 * @returns Matching Locale Configuration, Or Undefined If Not Found
 */
const getLocaleConfig = (languageCode: string): LocaleConfig | undefined =>
  localeConfigs.find((localeConfig: LocaleConfig): boolean => localeConfig.code === languageCode);

/**
 * Gets All Enabled Locale Configurations.
 *
 * @returns Array Of Enabled Locale Configurations
 */
const getEnabledLocaleConfigs = (): ReadonlyArray<LocaleConfig> =>
  localeConfigs.filter((localeConfig: LocaleConfig): boolean => localeConfig.enabled);

/**
 * Dynamically Imports A Locale By Its Language Code.
 * Uses A Cache To Avoid Redundant Imports.
 *
 * @param languageCode Locale Language Code To Import Messages For (e.g., 'en', 'fr')
 * @returns Promise Resolving To The Locale
 * @throws Error If The Locale Import Fails Or The Imported Data Is Invalid
 */
const importLocale = async (languageCode: string): Promise<Locale> => {
  const cachedLocale: Locale | undefined = localeCache.get(languageCode);

  if (cachedLocale) {
    return cachedLocale;
  }

  try {
    const locale: Locale = await import(`@legis-link/i18n/locales/${languageCode}.json`, { with: { type: 'json' } });

    localeCache.set(languageCode, locale);

    return locale;
  } catch (error: unknown) {
    const defaultLocaleConfig: LocaleConfig = getDefaultLocaleConfig();

    if (languageCode !== defaultLocaleConfig.code) {
      console.warn(
        `I18N_WARNING: Failed To Load Locale '${languageCode}', Falling Back To Default Locale '${defaultLocaleConfig.code}'`,
        error
      );

      return importLocale(defaultLocaleConfig.code);
    }

    throw new Error(
      `I18N_ERROR: Failed To Load Default Locale '${defaultLocaleConfig.code}': ${error instanceof Error ? error.message : String(error)}`
    );
  }
};

/**
 * Preloads A Specific Locale To Avoid Loading Delays During Runtime.
 *
 * @param languageCode Language Code Of The Locale To Preload (e.g., 'en', 'fr')
 * @returns Promise Resolving When The Locale Is Loaded
 */
const preloadLocale = async (languageCode: string): Promise<void> => {
  await importLocale(languageCode);
};

/**
 * Preloads All Enabled Locales.
 * Improves Performance By Loading Locales In The Background.
 *
 * @returns Promise Resolving When All Enabled Locales Are Loaded
 */
const preloadEnabledLocales = async (): Promise<void> => {
  const enabledLocales: ReadonlyArray<LocaleConfig> = getEnabledLocaleConfigs();
  await Promise.all(
    enabledLocales.map(async (enabledLocale: LocaleConfig): Promise<void> => preloadLocale(enabledLocale.code))
  );
};

/**
 * Clears The Locale Cache.
 * Useful For Testing Or Forcing A Reload Of Locale Data.
 *
 * @param [languageCode] Optional Language Code Of A Specific Locale To Clear. If Omitted, Clears The Entire Cache
 */
const clearLocaleCache = (languageCode?: string): void => {
  if (typeof languageCode === 'string' && languageCode.trim() !== '') {
    localeCache.delete(languageCode);
  } else {
    localeCache.clear();
  }
};

/**
 * Gets A List Of All Supported Locale Language Codes.
 *
 * @returns Array Of Locale Language Codes
 */
const getSupportedLanguageCodes = (): ReadonlyArray<string> =>
  localeConfigs.map((localeConfig: LocaleConfig): string => localeConfig.code);

/**
 * Checks If A Specific Locale Is Supported By Its Language Code.
 *
 * @param languageCode Language Code Of The Locale To Check (e.g., 'en', 'fr')
 * @returns True If The Locale Is Supported, False Otherwise
 */
const isLocaleSupported = (languageCode: string): boolean => getSupportedLanguageCodes().includes(languageCode);

/**
 * Checks If A Specific Locale Is Enabled By Its Language Code.
 *
 * @param languageCode Language Code Of The Locale To Check (e.g., 'en', 'fr')
 * @returns True If The Locale Is Enabled, False Otherwise
 */
const isLocaleEnabled = (languageCode: string): boolean => {
  const localeConfig: LocaleConfig | undefined = getLocaleConfig(languageCode);
  return localeConfig ? localeConfig.enabled : false;
};

/**
 * Formats A Number According To The Specified Locale's Rules.
 *
 * @param languageCode Language Code Of The Locale To Use For Formatting (e.g., 'en', 'fr')
 * @param number Number To Format
 * @param [options] Optional `Intl.NumberFormatOptions` To Customize The Formatting
 * @returns Formatted Number As A String
 */
const formatNumber = (languageCode: string, number: number, options?: Readonly<Intl.NumberFormatOptions>): string => {
  try {
    return new Intl.NumberFormat(languageCode, options).format(number);
  } catch (error: unknown) {
    console.warn(`I18N_WARNING: Could Not Format Number With Locale '${languageCode}', Falling Back To Default`, error);

    const defaultLocaleConfig: LocaleConfig = getDefaultLocaleConfig();
    return new Intl.NumberFormat(defaultLocaleConfig.code, options).format(number);
  }
};

export {
  getDefaultLocaleConfig,
  getLocaleConfig,
  getEnabledLocaleConfigs,
  importLocale,
  preloadLocale,
  preloadEnabledLocales,
  clearLocaleCache,
  getSupportedLanguageCodes,
  isLocaleSupported,
  isLocaleEnabled,
  formatNumber,
};
