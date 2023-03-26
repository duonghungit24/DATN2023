import React, { FC, useEffect, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Alert, Switch, TouchableOpacity, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Header, Screen, Text } from "../components"
import * as LocalAuthentication from "expo-local-authentication"
import { useStores } from "../models"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Setting: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Setting" component={SettingScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const SettingScreen: FC<StackScreenProps<AppStackScreenProps, "Setting">> = observer(
  function SettingScreen({ navigation }) {
    // Pull in one of our MST stores
    const { authStore } = useStores()
    const [isSupportBiometric, setSupportBiometric] = useState(true)
    const [statusBiometric, setStatusBiometric] = useState(false)

    useLayoutEffect(() => {
      setStatusBiometric(authStore.biometric)
    }, [authStore.biometric])

    const setBiometric = async () => {
      if (!statusBiometric) {
        // check xem có hỗ trợ biometric
        const reusltSupport = await LocalAuthentication.supportedAuthenticationTypesAsync()
        console.log("result", reusltSupport)
        if (reusltSupport.length == 0) {
          Alert.alert("thong bao", "khong ho tro roi")
          return
        } else {
          // check xem máy đã bật faceid hay vân tay chưa
          const result = await LocalAuthentication.isEnrolledAsync()
          if (!result) {
            Alert.alert("thong bao", "vui long bạt van tay")
            return
          } else {
            // set biometric 
            const result = await LocalAuthentication.authenticateAsync()
            console.log("restok", result)
            if (result.success) {
              authStore.setBiometric(true)
            }
          }
        }
      } else {
        authStore.setBiometric(false)
      }
    }
    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <Screen style={$root} preset="fixed">
        <Header />
        <TouchableOpacity
          style={{ paddingHorizontal: 16, backgroundColor: "red" }}
          onPress={() => navigation.navigate("changeLanguageScreen")}
        >
          <Text style={{ fontSize: 20 }}>ok</Text>
        </TouchableOpacity>
        <Switch value={statusBiometric} onChange={setBiometric} />
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
