/**
 * @fileoverview Type Definitions For The Internationalization (i18n) System
 */

import type EnglishMessages from '../locales/en.json';

type Locale = typeof EnglishMessages;

/**
 * Configuration For A Specific Locale
 */
type LocaleConfig = {
  /**
   * ISO 639-1 (Or Extended) Language Code
   * @example 'en', 'fr', 'zh-cn'
   */
  readonly code: string;
  /**
   * Localized Language Name (In That Language)
   * @example 'English', 'Français', '简体中文'
   */
  readonly localName: string;
  /**
   * Language Name In English
   * @example 'English', 'French', 'Simplified Chinese'
   */
  readonly name: string;
  /**
   * Text Direction: 'ltr' (Left-To-Right) Or 'rtl' (Right-To-Left)
   */
  readonly langDir: string;
  /**
   * Standard Date Format String
   * @example 'MM/DD/YYYY', 'YYYY-MM-DD'
   */
  readonly dateFormat: string;
  /**
   * RFC 5646 hreflang Attribute Value (For SEO And Accessibility)
   * @example 'en-GB', 'fr', 'zh-Hans'
   */
  readonly hreflang: string;
  /**
   * Whether The Locale Is Enabled And Available For Users
   */
  readonly enabled: boolean;
  /**
   * Whether This Is The Default Locale Used When No Preference Is Specified.
   * Only one locale should have this set to true.
   */
  readonly default: boolean;
};

export type { Locale, LocaleConfig };
