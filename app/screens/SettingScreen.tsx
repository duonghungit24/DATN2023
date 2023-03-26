import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Switch, TouchableOpacity, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Header, Screen, Text } from "../components"
import * as LocalAuthentication from 'expo-local-authentication';
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
export const SettingScreen: FC<StackScreenProps<AppStackScreenProps, "Setting">> = observer(function SettingScreen({navigation}) {
  // Pull in one of our MST stores
  const { authStore } = useStores()
  const [isSupportBiometric, setSupportBiometric] = useState(true)
  const [statusBiometric, setStatusBiometric] = useState(false)

  useEffect(() => {
    checkSupportBiometric()
  }, [])

  useEffect(() => {
    getCheckSaveBiometric()
  }, [isSupportBiometric])

  const checkSupportBiometric = async() => {
    const reuslt = await LocalAuthentication.supportedAuthenticationTypesAsync()
    console.log("result", reuslt)
    if(reuslt.length == 0)
    {
      setSupportBiometric(false)
    }
  //  console.log("res", reuslt.length)
  }

  const getCheckSaveBiometric = async() => {
  const respone = await  LocalAuthentication.isEnrolledAsync()
  if(respone)
    {
      console.log("ok")
      setBiometric()
    }
  }

  const setBiometric = async() => {
      const result = await LocalAuthentication.authenticateAsync()
      console.log("restok", result)
      if(result.success)
      {
        authStore.setBiometric(true)
      }
  }
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="fixed">
      <Header />
      <TouchableOpacity style={{paddingHorizontal: 16, backgroundColor: "red"}} onPress={() => navigation.navigate("changeLanguageScreen")}>
        <Text style={{fontSize: 20}}>ok</Text>
      </TouchableOpacity>
      {
        isSupportBiometric ? 
        <Switch value={statusBiometric} onChange={() => setStatusBiometric(!statusBiometric)} />
        : null
      }
     
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
