import { StorageService } from '../../services/storage'
import { AppLocale } from './types'

export declare type Optional<
  T extends object,
  K extends keyof T = keyof T,
> = Omit<T, K> & Partial<Pick<T, K>>

type ChangeAppLocalesParams = {
  languageAppLocale: AppLocale
}

export const changeAppLocales = ({
  languageAppLocale,
}: Optional<ChangeAppLocalesParams, 'languageAppLocale'>) => {
  if (languageAppLocale) {
    const storage = new StorageService<AppLocale>('app-locale_')
    storage.setItem('language', languageAppLocale)
  }

  location.reload()
}
