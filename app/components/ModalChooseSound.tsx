import * as React from "react"
import {
  FlatList,
  ScrollView,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import Modal from "react-native-modal"
import { configs } from "../utils/configs"
import { Button } from "./Button"
import { VectorsIcon } from "./Vectoricon"
import { ItemSerapator } from "./ItemSerapator"
import Sound from "react-native-sound"
import { useStores } from "../models"

export interface ModalChooseSoundProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  isVisible: boolean
  onBackDropPress: () => void
  soundValue: any
}

const LIST_SOUND = [
  {
    nameDisplay: "Mặc định",
    source: "",
    nameSound: "",
  },
  {
    nameDisplay: "Clock Alarm",
    source: require("../../assets/sounds/clockAlarm.wav"),
    nameSound: "clockalarm.wav",
  },
  {
    nameDisplay: "Quân đội",
    source: require("../../assets/sounds/quanDoi.wav"),
    nameSound: "quandoi.wav",
  },
  {
    nameDisplay: "Bip bip",
    source: require("../../assets/sounds/bipbip.wav"),
    nameSound: "bipbip.wav",
  },
  {
    nameDisplay: "End hour",
    source: require("../../assets/sounds/endhour.wav"),
    nameSound: "endhour.wav",
  },
  {
    nameDisplay: "Chiu chiu",
    source: require("../../assets/sounds/chiuchiu.wav"),
    nameSound: "chiuchiu.wav",
  },
  {
    nameDisplay: "Ring tone",
    source: require("../../assets/sounds/ringtone.wav"),
    nameSound: "ringTone.wav",
  },
  {
    nameDisplay: "Tik tik",
    source: require("../../assets/sounds/tiktik.wav"),
    nameSound: "tiktik.wav",
  },
  {
    nameDisplay: "Wave",
    source: require("../../assets/sounds/wave.wav"),
    nameSound: "wave.wav",
  },
  {
    nameDisplay: "Alarm reo",
    source: require("../../assets/sounds/alarmreo.wav"),
    nameSound: "alarmreo.wav",
  },
  {
    nameDisplay: "Error",
    source: require("../../assets/sounds/error.wav"),
    nameSound: "error.wav",
  },
]
/**
 * Describe your component here
 */
export const ModalChooseSound = observer(function ModalChooseSound(props: ModalChooseSoundProps) {
  const { style, isVisible, onBackDropPress, soundValue } = props
  const { authStore } = useStores()
  const $styles = [$container, style]
  const [sound, setSound] = React.useState<any>({})
  const soundCurrent = React.useRef(null)

  React.useEffect(() => {
    if (soundValue) {
      setSound(soundValue)
    }
    Sound.setCategory("Playback", true) // true = mixWithOthers
  }, [isVisible])

  function playSound(item) {
    const callback = (error, sound) => {
      if (error) {
        return
      }
      sound.play(() => {
        // Release when it's done so we're not using up resources
        sound.release()
      })
    }
    // If the audio is a 'require' then the second parameter must be the callback.
    if (soundCurrent.current == "null") {
      soundCurrent.current = new Sound(item.source, (error) => callback(error, sound))
    } else {
      const sound = new Sound(item.source, (error) => callback(error, sound))
      soundCurrent.current?.stop(() => {
        sound.play()
      })
      soundCurrent.current = sound
    }
  }

  const onPressSound = () => {
    soundCurrent.current?.stop()
    authStore.setSound(sound)
    onBackDropPress()
  }

  return (
    <Modal isVisible={isVisible} style={$styles} animationInTiming={500} animationOutTiming={500}>
      <View style={$content}>
        <Text preset="bold" tx="chonambao" style={$label} />
        <FlatList
          data={LIST_SOUND}
          keyExtractor={(_, index) => `${index}`}
          renderItem={({ item, index }) => {
            return (
              <ItemSound
                item={item}
                onPress={() => {
                  setSound(item)
                  playSound(item)
                }}
                check={sound.nameSound == item.nameSound}
              />
            )
          }}
          contentContainerStyle={{ padding: 16 }}
          ItemSeparatorComponent={() => <ItemSerapator />}
        />
        <View style={$viewButton}>
          <Button
            tx="huy"
            style={[$viewBtn, { backgroundColor: colors.neutral300 }]}
            textStyle={{ color: colors.neutral900 }}
            onPress={() => {
              soundCurrent.current?.stop()
              onBackDropPress()
            }}
          />
          <View style={{ width: 16 }} />
          <Button tx="luu" style={$viewBtn} onPress={onPressSound} />
        </View>
      </View>
    </Modal>
  )
})

const ItemSound = ({ check, onPress, item }) => {
  return (
    <TouchableOpacity style={$viewItem} onPress={onPress}>
      <Text preset="medium" style={$text}>
        {item.nameDisplay}
      </Text>
      {check && (
        <VectorsIcon type="AntDesign" name="checkcircle" size={20} color={colors.success} />
      )}
    </TouchableOpacity>
  )
}

const $container: ViewStyle = {
  justifyContent: "center",
  margin: 0,
}
const $content: ViewStyle = {
  height: configs.windowHeight / 2,
  backgroundColor: colors.neutral000,
  marginHorizontal: 16,
  borderRadius: 12,
}

const $label: TextStyle = {
  fontSize: 18,
  textAlign: "center",
  color: colors.neutral900,
  padding: 16,
}
const $viewButton: ViewStyle = {
  flexDirection: "row",
  padding: 16,
}
const $viewBtn: ViewStyle = {
  flex: 1,
  borderRadius: 24,
}
const $viewItem: ViewStyle = {
  flexDirection: "row",
  paddingVertical: 12,
}
const $text: TextStyle = {
  flex: 1,
  color: colors.neutral700,
  fontSize: 14,
}
