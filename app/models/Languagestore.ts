import { cast, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import i18n from "i18n-js"
import { LocaleConfig } from "react-native-calendars"
/**
 * Model description here for TypeScript hints.
 */
const hourPickerLocales = {
  vi: {
    monthNames: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
    monthNamesShort: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul.',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dec',
    ],
    dayNames: [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
    ],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    today: 'Hoje',
  },
  en: {
    amDesignator: 'AM',
    dayNames: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    monthNamesShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    pmDesignator: 'PM',
  },
};
LocaleConfig.locales['vi'] = hourPickerLocales['vi'];
LocaleConfig.locales['en'] = hourPickerLocales['en'];

type Language = "vi" | "ko" | "en" | "ja"
export const LanguagestoreModel = types
  .model("Languagestore")
  .props({
    language: types.optional(types.string, "vi"),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setLanguage: (language: Language) => {
      if (self.language === language) return
      self.language = cast(language)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .postProcessSnapshot(snap => {
    console.log('snap',snap)
    i18n.locale = snap.language
    return snap
  })  


export interface Languagestore extends Instance<typeof LanguagestoreModel> {}
export interface LanguagestoreSnapshotOut extends SnapshotOut<typeof LanguagestoreModel> {}
export interface LanguagestoreSnapshotIn extends SnapshotIn<typeof LanguagestoreModel> {}
export const createLanguagestoreDefaultModel = () => types.optional(LanguagestoreModel, {})
