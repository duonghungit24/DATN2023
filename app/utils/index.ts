import moment from "moment"
import { configs } from "./configs"

export const utils = {
  displayDate: (date) => {
    return date ? moment(date).format(configs.formatDateDisplay) : ""
  },
  zeroPad(value, length) {
    return `${value}`.padStart(length, "0")
  },
  getTime() {
    return `${utils.zeroPad(new Date().getHours(), 2)}:${utils.zeroPad(new Date().getMinutes(), 2)}`
  },
}
