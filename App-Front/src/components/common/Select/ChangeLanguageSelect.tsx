import { FormControl, MenuItem, Select } from '@mui/material'
import { FC } from 'react'

import { changeAppLocales } from '../../../containers/LocaleProvider/constants'
import {
  AppLocale,
  appLocaleNames,
} from '../../../containers/LocaleProvider/types'
import { StorageService } from '../../../services/storage'

const ChangeLanguageSelect: FC = () => {
  const storage = new StorageService<AppLocale>('app-locale_')
  const languageAppLocale: AppLocale = storage.getItem('language') ?? 'fr-FR'

  const handleLanguageChange = (newLanguage: AppLocale) => {
    changeAppLocales({
      languageAppLocale: newLanguage,
    })
  }

  return (
    <FormControl sx={{ width: '100%' }}>
      <Select
        placeholder="Language"
        value={languageAppLocale}
        onChange={(event) => {
          handleLanguageChange(event.target.value as AppLocale)
        }}
      >
        {Object.entries(appLocaleNames).map(([key, value]) => (
          <MenuItem key={key} value={key}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default ChangeLanguageSelect
