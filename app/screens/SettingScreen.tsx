import React, { FC, useEffect, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  Alert,
  ScrollView,
  Switch,
  TextStyle,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Header, Screen, Text, Toggle, VectorsIcon } from "../components"
import * as LocalAuthentication from "expo-local-authentication"
import { useStores } from "../models"
import { colorRandomItem, colors } from "../theme"
import { onSnapshot } from "mobx-state-tree"
import { translate } from "../i18n"
import { configs } from "../utils/configs"
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
    const colorScheme = useColorScheme()
    console.log("color",colorScheme)
    console.log("item", new Date(Date.now()))
    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <Screen style={$root} preset="fixed">
        <Header titleTx="caidat" backgroundColor={colors.neutral100} />
        <ScrollView contentContainerStyle={{ paddingBottom: configs.windowHeight / 10}}>
          <View style={$viewContent}>
            <ItemSetting
              typeIcon="FontAwesome"
              nameIcon="language"
              bgColor={colorRandomItem[0]}
              titleTx="ngonngu"
              onPress={() => navigation.navigate("changeLanguageScreen")}
            />
            <View style={$line} />
            <ItemSwitch
              typeIcon="Fontisto"
              nameIcon="locked"
              activeToggle={statusBiometric}
              onChangeToggle={setBiometric}
              bgColor={colorRandomItem[3]}
            />
          </View>
          <View style={$viewContent}>
            <ItemSetting
              typeIcon="MaterialIcons"
              nameIcon="feedback"
              bgColor={colorRandomItem[4]}
              titleTx="phanhoi"
              onPress={() => navigation.navigate("changeLanguageScreen")}
            />
            <View style={$line} />
            <ItemSetting
              typeIcon="MaterialIcons"
              nameIcon="star-rate"
              bgColor={colorRandomItem[8]}
              titleTx="danhgia"
              onPress={() => navigation.navigate("changeLanguageScreen")}
            />
            <View style={$line} />
            <ItemSetting
              typeIcon="Ionicons"
              nameIcon="reader-outline"
              bgColor={colorRandomItem[5]}
              titleTx="dieukien"
              onPress={() => navigation.navigate("changeLanguageScreen")}
            />
            <View style={$line} />
            <ItemSetting
              typeIcon="MaterialIcons"
              nameIcon="policy"
              bgColor={colorRandomItem[6]}
              titleTx="chinhsachbaomat"
              onPress={() => navigation.navigate("changeLanguageScreen")}
            />
          </View>
        </ScrollView>
      </Screen>
    )
  },
)

const ItemSetting = ({ onPress, titleTx, typeIcon, nameIcon, bgColor }) => {
  return (
    <TouchableOpacity style={$viewItem} onPress={onPress}>
      <View style={[$viewIcon, { backgroundColor: bgColor }]}>
        <VectorsIcon type={typeIcon} name={nameIcon} color={colors.neutral000} size={20} />
      </View>
      <Text preset="bold" tx={titleTx} style={$textItem} />
      <VectorsIcon type="Feather" name="chevron-right" size={25} color={colors.neutral900} />
    </TouchableOpacity>
  )
}
const ItemSwitch = ({ activeToggle, onChangeToggle, typeIcon, nameIcon, bgColor }) => {
  return (
    <View style={$viewItem}>
      <View style={[$viewIcon, { backgroundColor: bgColor }]}>
        <VectorsIcon type={typeIcon} name={nameIcon} color={colors.neutral000} size={20} />
      </View>
      <Text preset="bold" tx="baomat" style={$textItem} />
      <Toggle variant="switch" value={activeToggle} onPress={onChangeToggle} />
    </View>
  )
}

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.neutral100,
}
const $viewItem: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  padding: 12,
}
const $textItem: TextStyle = {
  flex: 1,
  fontSize: 16,
}
const $line: ViewStyle = {
  height: 0.5,
  backgroundColor: colors.neutral300,
}
const $viewIcon: ViewStyle = {
  backgroundColor: "red",
  alignItems: "center",
  justifyContent: "center",
  padding: 8,
  marginRight: 8,
  borderRadius: 6,
}
const $viewContent: ViewStyle = {
  margin: 16,
  ...configs.shadow,
  backgroundColor: colors.neutral000,
  borderRadius: 12,
}
