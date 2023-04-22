import React, { useEffect, useRef, useState } from "react"
import { Animated } from "react-native"

export function TopTapAnimated() {
  const [active, setActive] = useState(0)
  const [tabOne, setTabOne] = useState(0)
  const [tabTwo, setTabTwo] = useState(0)
  const [tabThree, setTabThree] = useState(0)
  const translateX = useRef(new Animated.Value(0)).current

  useEffect(() => {
    handleSlide(active)
  }, [active])

  const handleSlide = (type) => {
    Animated.spring(translateX, {
      toValue: type == 0 ? tabOne : type == 1 ? tabTwo : tabThree,
      duration: 100,
      useNativeDriver: true,
    }).start()
  }

  return {
    tabOne,
    tabThree,
    tabTwo,
    active,
    setTabOne,
    setActive,
    setTabTwo,
    setTabThree,
    translateX,
  }
}
