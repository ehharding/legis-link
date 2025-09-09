import { Locale } from '@legis-link/website-i18n/types';

declare module 'next-intl' {
  interface AppConfig {
    Messages: Locale;
  }
}
