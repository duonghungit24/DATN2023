import moment from "moment"
import Toast from "react-native-toast-message"
import { configs } from "./configs"
import { ToastProps } from "./toastConfigs"

export const utils = {
  showToast(params: ToastProps) {
    Toast.show(params)
  },

  hideToast() {
    Toast.hide()
  },
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
