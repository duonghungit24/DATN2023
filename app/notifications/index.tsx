import * as Notifications from "expo-notifications"
import { Platform } from "react-native"

export const requestPermissionsAsync = async () => {
  await Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  })
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      // sound: "bipbip.wav",
      lightColor: "#FF231F7C",
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
      bypassDnd: true,
    })
  } else {
    await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowAnnouncements: true,
      },
    })
  }
}
export async function getPermission() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync()
  let finalStatus = existingStatus
  console.log("status", finalStatus)
  if (finalStatus == "denied") {
    await requestPermissionsAsync()
  }
}
export async function removeNotificationById(idNotification) {
  await Notifications.cancelScheduledNotificationAsync(idNotification)
}

export const setScheduleNotificationAsync = async (content, trigger) => {
  const idNotification = await Notifications.scheduleNotificationAsync({
    content: content,
    trigger: trigger,
  })
  return idNotification
}
