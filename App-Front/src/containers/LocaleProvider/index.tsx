import { ReactNode } from 'react'
import { IntlProvider } from 'react-intl'

import { StorageService } from '../../services/storage'
import { AppLocale, appLocaleToTranslationMessages } from './types'

const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const storage = new StorageService<AppLocale>('app-locale_')
  const languageAppLocale: AppLocale = storage.getItem('language') || 'fr-FR'

  return (
    <IntlProvider
      locale={languageAppLocale}
      messages={appLocaleToTranslationMessages[languageAppLocale]}
    >
      {children}
    </IntlProvider>
  )
}

export default LocaleProvider
