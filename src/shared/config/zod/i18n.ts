import i18next from 'i18next'
import { z } from 'zod'
import { makeZodI18nMap } from 'zod-i18n-map'
import { PT_BR } from './languages/pt'

i18next.init({
  lng: 'pt',
  resources: {
    pt: { zod: PT_BR },
  },
})

z.setErrorMap(makeZodI18nMap({ t: i18next.t.bind(i18next) }))

export { z }
