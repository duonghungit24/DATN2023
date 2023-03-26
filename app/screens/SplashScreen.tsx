import React, { FC, useEffect, useRef } from "react"
import { observer } from "mobx-react-lite"
import { Animated, Easing, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps, navigate } from "../navigators"
import { Screen, Text } from "../components"
import LottieView from 'lottie-react-native';
import { useStores } from "../models"
import * as LocalAuthentication from 'expo-local-authentication';
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Splashscreen: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Splashscreen" component={SplashscreenScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const SplashScreen: FC<StackScreenProps<AppStackScreenProps, "Splashscreen">> = observer(function SplashscreenScreen({navigation}) {
  // Pull in one of our MST stores
  const { authStore } = useStores()
  const animationProgress = useRef(new Animated.Value(0))

  useEffect(() => {
    if(authStore.isIntro)
    {
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "chooseLanguageScreen" }],
        })
      }, 3000);
    }
    else
    {
      if(authStore.biometric)
      {
        setTimeout(() => {
          setBiometric()
        }, 3000);
      }
      else
      {  
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "bottomTab" }],
          })
        }, 3000);
      }
    }
   
  }, [])

  const setBiometric = async() => {
    const result = await LocalAuthentication.authenticateAsync()
    console.log("restok", result)
    if(result.success)
    {
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "bottomTab" }],
        })
      }, 3000);
    }
}
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="fixed">
       <LottieView
        source={require('../../assets/images/task.json')}
        style={$styleLotte}
        autoPlay
        loop
      />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent:"center", 
}
const $styleLotte : ViewStyle = {
  width: "60%",
  aspectRatio: 1,
}