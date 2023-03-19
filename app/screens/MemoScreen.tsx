import React, { FC, useEffect, useRef } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity, FlatList } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Header, Screen, Text, VectorsIcon } from "../components"
import { colorRandomItem } from "../theme"
import * as Animatable from "react-native-animatable"
import { configs } from "../utils/configs"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Memoscreen: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Memoscreen" component={MemoscreenScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const MemoScreen: FC<StackScreenProps<AppStackScreenProps, "Memoscreen">> = observer(
  function MemoscreenScreen({navigation}) {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()
    const viewRef = useRef(null)
    const animation = configs.Animations[Math.floor(Math.random() * configs.Animations.length)]

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        viewRef.current.animate({ 0: { opacity: 0.5, }, 1: { opacity: 1 } });
      })
      // ToastAndroid.show(animation+ ' Animation', ToastAndroid.SHORT);
      return () => unsubscribe;
    }, [navigation])

    const renderItem = ({ item, index }) => (
      <ListItem item={item} animation={animation} index={index}  navigation={navigation} />)
    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <Screen style={$root} preset="fixed">
        <Header backgroundColor="red" title="memo" />
        <Animatable.View
          ref={viewRef}
          easing={'ease-in-out'}
         duration={500}
          style={{flexShrink: 1}}
        >
         <FlatList
            data={Array(15).fill('')}
            keyExtractor={(_, index) => `${index}`}
            numColumns={2}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100}}
          />
      </Animatable.View>
      </Screen>
    )
  },
)

const ListItem = ({ item, index, animation, navigation } : any) => {
  const bgColor = (i) => colorRandomItem[i % colorRandomItem.length]

  return (
    <Animatable.View animation={animation} duration={1000} delay={index * 300}>
      <View
        style={{ height: 200, width: configs.windowWidth / 2 - 16, margin: 8, borderRadius: 10 }}
      >
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Screen")}>
          <View
            style={[
              { height: 150, margin: 5, borderRadius: 10 },
              { backgroundColor: bgColor(index) },
            ]}
          />
        </TouchableOpacity>
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{fontSize: 14}}>Lorem ipsum</Text>
          <VectorsIcon type="Feather" name="more-vertical" size={20} color={"black"} />
        </View>
      </View>
    </Animatable.View>
  )
}

const $root: ViewStyle = {
  flex: 1,
}
