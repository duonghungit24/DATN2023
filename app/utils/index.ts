import moment from "moment"
import Toast from "react-native-toast-message"
import { configs } from "./configs"
import { ToastProps } from "./toastConfigs"
import { TextStyle } from "react-native"
import { navigate } from "../navigators"

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
  displayDateHour: (date) => {
    let dateFormat = ""
    if (date) {
      dateFormat = moment(date).format("DD/MM/YYYY HH:mm")
      return dateFormat
    }
    return dateFormat
  },
  displayDateCalendar: (date) => {
    let dateFormat = ""
    if (date) {
      dateFormat = moment(date).format("YYYY-MM-DD")
      return dateFormat
    }
    return dateFormat
  },
  zeroPad(value, length) {
    return `${value}`.padStart(length, "0")
  },
  getTime() {
    return `${utils.zeroPad(new Date().getHours(), 2)}:${utils.zeroPad(new Date().getMinutes(), 2)}`
  },
  hoursAndMinutes: (date) => {
    const now = new Date(date)
    return utils.zeroPad(now.getHours(), 2) + ":" + utils.zeroPad(now.getMinutes(), 2)
  },
  convertDigitInDate: (str) => {
    if (!str || str == null) return ""
    return str.split("-").reverse().join("/")
  },
  navigateTodo: (itemTodo) => {
    navigate("detailTodoScreen", { itemTodo })
  },
  navigateEvent: (itemDetail) => {
    navigate("detailEventScreen", { itemDetail })
  },
}
