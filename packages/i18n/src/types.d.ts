/**
 * @fileoverview Type definitions for the internationalization (i18n) package
 */

import type EnglishMessages from '../locales/en.json';

type Locale = typeof EnglishMessages;

/**
 * Configuration for a specific locale
 */
type LocaleConfig = {
  /**
   * ISO 639-1 (or extended) language code
   * @example 'en', 'fr', 'zh-cn'
   */
  readonly code: string;
  /**
   * Localized language name (in that language)
   * @example 'English', 'Français', '简体中文'
   */
  readonly localName: string;
  /**
   * Language name in English
   * @example 'English', 'French', 'Simplified Chinese'
   */
  readonly name: string;
  /**
   * Text direction: 'ltr' (left-to-right) or 'rtl' (right-to-left)
   */
  readonly langDir: string;
  /**
   * Standard date format string
   * @example 'MM/DD/YYYY', 'YYYY-MM-DD'
   */
  readonly dateFormat: string;
  /**
   * RFC 5646 hreflang attribute value (for SEO and accessibility)
   * @example 'en-GB', 'fr', 'zh-Hans'
   */
  readonly hrefLang: string;
  /**
   * Whether the locale is enabled and available for users
   */
  readonly enabled: boolean;
  /**
   * Whether this is the default locale used when no preference is specified
   * @remarks Only one locale should have this set to true
   */
  readonly default: boolean;
};

export type { Locale, LocaleConfig };
