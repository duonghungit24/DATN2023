import * as Notifications from "expo-notifications"
export const requestPermissionsAsync = async () => {
  await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
  })
}
export async function getPermission() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync()
  let finalStatus = existingStatus
  console.log("status", finalStatus)
  if (finalStatus == "denied") {
    await requestPermissionsAsync()
  }
}
