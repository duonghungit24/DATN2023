import React, { FC, useEffect, useRef, useState } from "react"
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
import { Button, Screen, Text } from "../components"
import { colors } from "../theme"
import { JumpingTransition } from "react-native-reanimated"
import { configs } from "../utils/configs"
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
    title: "Manage Goals",
    text: "Set your business strategy and achieve the goals you are aiming for",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
  },
  {
    id: 2,
    title: "Manage Goals2",
    text: "Set your business strategy and achieve the goals you are aiming for",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
  },
  {
    id: 3,
    title: "Manage Goals3",
    text: "Set your business strategy and achieve the goals you are aiming for",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
  },
]
// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const OnboardingScreen: FC<StackScreenProps<AppStackScreenProps, "Onboarding">> = observer(
  function OnboardingScreen({ navigation }) {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()
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
        navigation.reset({
          index: 0,
          routes: [{ name: "bottomTab" }],
        })
      } else {
        setActiveIndex(activeIndex + 1)
      }
    }
    // const navigation = useNavigation()
    return (
      <Screen style={$root} preset="fixed">
        <FlatList
          ref={imgRef}
          data={listOnboarding}
          scrollEventThrottle={16}
          keyExtractor={(_, index) => `${index}`}
          scrollEnabled={false}
          // onMomentumScrollEnd ={(e) => scrollToActive(Math.floor(e.nativeEvent.contentOffset.x/configs.windowWidth))}
          renderItem={({ item, index }) => {
            return <Image source={{ uri: item.image }} style={$image} />
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
         <View style={{bottom: configs.windowHeight / 3}}>
            <Text style={$title}>{listOnboarding[activeIndex].title}</Text>
            <Text style={$text}>{listOnboarding[activeIndex].text}</Text>
          </View>
        <View style={$viewBtn}>
          <View style={{ flexDirection: "row" }}>
            {listOnboarding.map((_, index) => {
              return <View key={index} style={index == activeIndex ? $activeDot : $nonActiveDot} />
            })}
          </View>
          <TouchableOpacity onPress={onPressActiveIndex} style={$btn} activeOpacity={0.8}>
            <Text tx={activeIndex == listOnboarding.length - 1 ? "batdau" : "tieptuc"} style={$textBtn}/>
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
const $image: ImageStyle = {
  width: configs.windowWidth,
  height: configs.windowHeight / 2.5,
  resizeMode: "contain",
  top: 70
}
const $title: TextStyle = {
  fontSize: 20,
  color: colors.neutral900,
  marginTop: 20,
  textAlign: 'center'
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
  textAlign: 'center'
}
const $textBtn : TextStyle = {
  color : colors.neutral000,
  fontSize: 14,
}