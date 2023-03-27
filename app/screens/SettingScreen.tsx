import React, { FC, useEffect, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Alert, Switch, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Header, Screen, Text, VectorsIcon } from "../components"
import * as LocalAuthentication from "expo-local-authentication"
import { useStores } from "../models"
import { colors } from "../theme"
import { onSnapshot } from "mobx-state-tree"
import { translate } from "../i18n"
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
    const { languageStore } = useStores()
    const [refresh, setRefresh] = useState(false)
    useEffect(() => {
      onSnapshot(languageStore, (snap) => {
        setRefresh(!refresh)
      })
    }, [languageStore.language])

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
            Alert.alert(translate("thongbao"), translate("batvantay"))
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

    console.log("item",new Date(Date.now()))
    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <Screen style={$root} preset="fixed">
        <Header titleTx="caidat" backgroundColor={colors.neutral100}/>
        <ItemSetting titleTx="ngonngu" onPress={() => navigation.navigate("changeLanguageScreen")}/>
        <View style={$line} />
        <View style={$viewItem}>
        <Text preset="bold" tx="baomat" style={$textItem}/>
        <Switch value={statusBiometric} onChange={setBiometric} />
        </View>
      </Screen>
    )
  },
)

const ItemSetting = ({onPress , titleTx}) => {
  return (
    <TouchableOpacity style={$viewItem} onPress={onPress}>
        <Text preset="bold" tx={titleTx} style={$textItem} />
        <VectorsIcon 
          type="Feather"
          name="chevron-right"
          size={25}
          color={colors.neutral900}
        />
    </TouchableOpacity>
  )
}

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.neutral100
}
const $viewItem : ViewStyle = {
  flexDirection: 'row',
  paddingHorizontal: 16,
  backgroundColor: colors.neutral000,
}
const $textItem : TextStyle = {
  flex:1,
   fontSize: 16
}
const $line: ViewStyle = {
  height: 1,
  backgroundColor: colors.neutral300,
  marginVertical:16
}