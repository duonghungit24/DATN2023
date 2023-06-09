import React, { FC, useCallback, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  FlatList,
  ViewStyle,
  View,
  Image,
  ImageStyle,
  TextStyle,
  TouchableOpacity,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Button, Header, Screen, Text } from "../components"
import { colors } from "../theme"
import { configs } from "../utils/configs"
import { onboarding } from "../theme/image"
import { useStores } from "../models"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Onboarding: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Onboarding" component={OnboardingScreen} />`
// Hint: Look for the 🔥!
const listOnboarding = [
  {
    id: 1,
    titleTx: "onboarding1",
    textTx: "onboardingtext1",
    image: onboarding.onboarding2,
  },
  {
    id: 2,
    titleTx: "onboarding2",
    textTx: "onboardingtext2",
    image: onboarding.onboarding1,
  },
  {
    id: 3,
    titleTx: "onboarding3",
    textTx: "onboardingtext3",
    image: onboarding.onboarding3,
  },
]
// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const OnboardingScreen: FC<StackScreenProps<AppStackScreenProps, "Onboarding">> = observer(
  function OnboardingScreen({ navigation }) {
    // Pull in one of our MST stores
    const { authStore } = useStores()
    const imgRef = useRef(null)
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
      scrollToIndex()
    }, [activeIndex])
    // Pull in navigation via hook

    // const scrollToActive = (index) => {
    //   setActiveIndex(index)
    // }

    const scrollToIndex = () => {
      imgRef?.current?.scrollToOffset({
        animated: true,
        offset: activeIndex * configs.windowWidth,
      })
    }

    const onPressActiveIndex = () => {
      if (activeIndex == listOnboarding.length - 1) {
        authStore.setIntro()
        navigation.reset({
          index: 0,
          routes: [{ name: "bottomTab" }],
        })
      } else {
        setActiveIndex(activeIndex + 1)
      }
    }

    const onFlatlistUpdate = useCallback(({ viewableItems }: any) => {
      if (viewableItems.length > 0) {
        setActiveIndex(viewableItems[0].index)
      }
    }, [])

    // const navigation = useNavigation()
    return (
      <Screen style={$root} preset="fixed">
        <Header backgroundColor="transparent" />
        <FlatList
          ref={imgRef}
          showsHorizontalScrollIndicator={false}
          data={listOnboarding}
          keyExtractor={(item, index) => `${index}`}
          horizontal
          renderItem={({ item, index }) => (
            <View style={$itemIntro}>
              <Image source={item.image} style={$logo} />
              <Text preset="bold" style={$title} tx={item.titleTx} />

              <Text preset="medium" style={$text} tx={item.textTx} />
            </View>
          )}
          snapToAlignment={"start"}
          snapToInterval={configs.windowWidth}
          decelerationRate={"fast"}
          pagingEnabled
          viewabilityConfig={{
            viewAreaCoveragePercentThreshold: 50,
          }}
          onViewableItemsChanged={onFlatlistUpdate}
        />
        <View style={$viewBtn}>
          <View style={{ flexDirection: "row" }}>
            {listOnboarding.map((_, index) => {
              return <View key={index} style={index == activeIndex ? $activeDot : $nonActiveDot} />
            })}
          </View>
          <TouchableOpacity onPress={onPressActiveIndex} style={$btn} activeOpacity={0.8}>
            <Text
              preset="bold"
              tx={activeIndex == listOnboarding.length - 1 ? "batdau" : "tieptuc"}
              style={$textBtn}
            />
          </TouchableOpacity>
        </View>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.neutral000,
  alignItems: "flex-start",
}
const $itemIntro: ViewStyle = {
  width: configs.windowWidth,
  alignItems: "center",
}
const $logo: ImageStyle = {
  width: "100%",
  height: 280,
  resizeMode: "contain",
}

const $image: ImageStyle = {
  width: configs.windowWidth - 48,
  height: configs.windowHeight / 2.5,
  resizeMode: "contain",
  top: 100,
}
const $title: TextStyle = {
  fontSize: 20,
  color: colors.neutral900,
  marginTop: 20,
  textAlign: "center",
}
const $viewBtn: ViewStyle = {
  position: "absolute",
  width: "100%",
  bottom: 50,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: 20,
}
const $btn: ViewStyle = {
  height: 44,
  backgroundColor: colors.primary500,
  paddingHorizontal: 24,
  justifyContent: "center",
  borderRadius: 24,
}
const $activeDot: ViewStyle = {
  width: 32,
  height: 8,
  borderRadius: 7,
  backgroundColor: colors.primary500,
  marginHorizontal: 4,
}
const $nonActiveDot: ViewStyle = {
  height: 8,
  width: 8,
  borderRadius: 7,
  backgroundColor: colors.neutral300,
  marginHorizontal: 4,
  opacity: 0.6,
}
const $text: TextStyle = {
  color: colors.neutral600,
  fontSize: 14,
  paddingHorizontal: 24,
  textAlign: "center",
  marginTop: 4,
}
const $textBtn: TextStyle = {
  color: colors.neutral000,
  fontSize: 14,
}
