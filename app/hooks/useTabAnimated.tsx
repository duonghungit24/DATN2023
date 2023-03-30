import React, { useEffect, useRef, useState } from "react"
import { View, Text, TouchableOpacity, Animated, ScrollView, Image, Dimensions } from "react-native"
import { observer } from "mobx-react-lite"
import { configs } from "../utils/configs"

export const TopTabAnimated = observer(function TopTapAnimated() {
  const [active, setActive] = useState(0)
  const [tabOne, setTabOne] = useState(0)
  const [tabTwo, setTabTwo] = useState(0)
  const translateX = useRef(new Animated.Value(0)).current
  const translateXTabOne = useRef(new Animated.Value(0)).current
  const translateXTabTwo = useRef(new Animated.Value(configs.windowWidth)).current
  const [translateY, setTranslateY] = useState(-1000)

  useEffect(() => {
    handleSlide(active)
  },[active])

  const handleSlide = (type) => {
    Animated.spring(translateX, {
      toValue: type == 0 ? tabOne : tabTwo,
      duration: 100,
      useNativeDriver: true,
    }).start()
    if (active === 0) {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.spring(translateXTabTwo, {
          toValue: configs.windowWidth,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start()
    } else if(active == 1){
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: -configs.windowWidth,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.spring(translateXTabTwo, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }

  console.log("tab", translateXTabTwo)
  console.log("y", translateY)

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: "90%",
          marginLeft: "auto",
          marginRight: "auto",
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginTop: 40,
            marginBottom: 20,
            height: 36,
            position: "relative",
          }}
        >
          <Animated.View
            style={{
              position: "absolute",
              width: "50%",
              height: "100%",
              top: 0,
              left: 0,
              backgroundColor: "#007aff",
              borderRadius: 4,
              transform: [
                {
                  translateX,
                },
              ],
            }}
          />
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#007aff",
              borderRadius: 4,
              borderRightWidth: 0,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
            onLayout={(event) => setTabOne(event.nativeEvent.layout.x)}
            onPress={() => {
              setActive(0)
            //  handleSlide(tabOne)
            }}
          >
            <Text
              style={{
                color: active === 0 ? "#fff" : "#007aff",
              }}
            >
              Tab One
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#007aff",
              borderRadius: 4,
              borderLeftWidth: 0,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
            onLayout={(event) => setTabTwo(event.nativeEvent.layout.x)}
            onPress={() => {
              setActive(1)
           //   handleSlide(tabTwo)
            }}
          >
            <Text
              style={{
                color: active === 1 ? "#fff" : "#007aff",
              }}
            >
              Tab Two
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{flex: 1}} >
          <Animated.View
            style={{
              flex: 1,
              backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
              transform: [
                {
                  translateX: translateXTabOne,
                },
              ],
            }}
            onLayout={(event) => setTranslateY(event.nativeEvent.layout.height)}
          >
            <View style={{ height: 20 }}>
              <Text style={{ color: "red" }}>Hi, I am a cute cat</Text>
            </View>
          </Animated.View>

          <Animated.View
            style={{
              flex: 1,
              backgroundColor: "blue",
              justifyContent: "center",
              alignItems: "center",
              transform: [
                {
                  translateX: translateXTabTwo,
                },
                {
                  translateY: -translateY,
                },
              ],
            }}
          >
            <View style={{ height: 20 }}>
              <Text style={{ color: "red" }}>Hi, I am a cute dog</Text>
            </View>
          </Animated.View>
        </ScrollView>
      </View>
    </View>
  )
})
