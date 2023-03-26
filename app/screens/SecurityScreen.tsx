import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen, Text } from "../components"
import * as LocalAuthentication from 'expo-local-authentication';
import { colors } from "../theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Security: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Security" component={SecurityScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const SecurityScreen: FC<StackScreenProps<AppStackScreenProps, "Security">> = observer(function SecurityScreen({navigation}) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const [textWarning, setTextWarnig] = useState("")

  useEffect(() => {
    getBiometric()
  }, [])

  const getBiometric = async() => {
    const result = await LocalAuthentication.authenticateAsync()
    console.log("restok", result)
    if(result.success)
    {
        navigation.reset({
          index: 0,
          routes: [{ name: "bottomTab" }],
        })
    }
    else 
    {
       setTextWarnig("")
    }
}
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="fixed">
      <Text text="security" />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.neutral000
}
