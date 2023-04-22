import React, { useMemo, useState } from "react"
import {
  ImageStyle,
  ScrollView,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
  Image,
  TextStyle,
} from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import Modal from "react-native-modal"
import { HeaderCreate, TitleAndContent } from "./ModalCreatePlan"
import { TextField } from "./TextField"
import { configs } from "../utils/configs"
import { VectorsIcon } from "./Vectoricon"
import { Toggle } from "./Toggle"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { useStores } from "../models"
import { utils } from "../utils"
import { translate } from "../i18n"
import ImagePicker from "react-native-image-crop-picker"
import ImageView from "react-native-image-viewing"
import uuid from "react-native-uuid"
import { toastConfig } from "../utils/toastConfigs"
import Toast from "react-native-toast-message"

export interface ModalCreateDiaryProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  isVisible: boolean
  onBackDropPress: () => void
  type: "note" | "diary"
}

interface TypeTime {
  type: "date" | "time" | "datetime"
  show: boolean
}
/**
 * Describe your component here
 */
export const ModalCreateDiary = observer(function ModalCreateDiary(props: ModalCreateDiaryProps) {
  const { style, isVisible, onBackDropPress, type } = props
  const { languageStore, memoStore, diaryStore } = useStores()
  const $styles = [$container, style]

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [url, setUrl] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState(new Date())

  const [toggleDate, setToggleDate] = useState(false)
  const [togglePin, setTogglePin] = useState(false)
  const [isVisibleDate, setIsvisibleDate] = useState(false)
  const [images, setImages] = useState([])
  const [isVisibleImg, setIsvisibleImg] = useState(false)
  const [indexImg, setIndexImg] = useState(-1)

  const pickImage = () => {
    ImagePicker.openPicker({
      multiple: true,
    }).then((listImages) => {
      const result = listImages.map((el) => {
        return {
          id: uuid.v4(),
          uri: el.sourceURL,
        }
      })
      setImages([...images, ...result])
    })
  }

  const DisplayImage = useMemo(() => {
    return (
      <SelectImage
        dataImages={images}
        onPressAdd={pickImage}
        onPressView={(index) => viewImage(index)}
        onPressRemove={(value) => onPressRemoveImg(value)}
      />
    )
  }, [images.length])

  const viewImage = (index) => {
    setIsvisibleImg(true)
    setIndexImg(index)
  }

  const onPressRemoveImg = (value) => {
    const dt = images.filter((el) => el.id != value.id)
    setImages(dt)
  }

  const onConfirmDate = (value) => {
    setDate(value)
    setIsvisibleDate(false)
  }

  const showToggleDate = useMemo(() => {
    return (
      <>
        <TextField
          LeftAccessory={() => (
            <LeftAccesstory typeIcon="AntDesign" nameIcon="calendar" colorIcon={colors.primary500} />
          )}
          value={utils.displayDate(date)}
          inputWrapperStyle={$wrapInput}
          clearButtonMode="while-editing"
          editable={false}
          onPressIn={() => setIsvisibleDate(true)}
        />
      </>
    )
  }, [toggleDate, date])

  console.log("date", new Date(date).getHours())

  const showHeaderCreate = useMemo(() => {
    return (
      <>
        {type == "note" ? (
          <TitleAndContent
            title={title}
            onChangeTitle={setTitle}
            content={content}
            onChangeContent={setContent}
          />
        ) : (
          <View style={$viewTitleContent}>
            <TextField
              value={content}
              onChangeText={setContent}
              placeholderTx="nhatkytext"
              inputWrapperStyle={$wrapInput}
              autoFocus
              clearButtonMode="while-editing"
              placeholderTextColor={colors.neutral900}
              multiline
              style={$inputDiary}
            />
          </View>
        )}
      </>
    )
  }, [type, title, content])
  // console.log("date",utils.displayDateHour(date))

  // tạo ghi chú hoặc nhật ký
  const onCreate = () => {
    if (type == "diary") {
      const item = {
        id: uuid.v4(),
        content: content,
        time: date.toString(),
        emoji: "",
        isPin: togglePin,
        color: "#5d6700",
        location: location,
        url: url,
        images: images,
      }
      diaryStore.addDiray(utils.displayDateCalendar(date), item)
      Toast.show({
        type: "success",
        text1: translate("taonhatky"),
      })
    } else {
      const item = {
        id: uuid.v4(),
        title: title,
        content: content,
        time: date.toString(),
        emoji: "",
        isPin: togglePin,
        color: "#5d6700",
        location: location,
        url: url,
        listImg: images,
      }
      console.log("item", item)
      memoStore.addMemo(item)
      Toast.show({
        type: "success",
        text1: translate("taoghichu"),
      })
    }
  //  onBackDropPress()
  }

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onBackDropPress}
      style={$styles}
      animationInTiming={500}
      animationOutTiming={500}
      onSwipeComplete={onBackDropPress}
      swipeDirection={"down"}
      propagateSwipe={true}
      avoidKeyboard
      // useNativeDriver={true}
    >
    
      <View style={$viewContainer}>
        <Toast position="top" config={toastConfig} />
        <ImageView
          images={images}
          imageIndex={indexImg}
          visible={isVisibleImg}
          onRequestClose={() => setIsvisibleImg(false)}
        />
        <DateTimePickerModal
          date={date}
          locale={languageStore.language}
          isVisible={isVisibleDate}
          mode={"datetime"}
          onConfirm={onConfirmDate}
          onCancel={() => setIsvisibleDate(false)}
          cancelTextIOS={translate("huy")}
          confirmTextIOS={translate("xacnhan")}
        />
       
        <HeaderCreate typeName={type} onPressBack={onBackDropPress} onPressAdd={onCreate} />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {showHeaderCreate}
          <View style={[$viewTitleContent, { height: 100 }]}>
            <Text preset="bold" tx="bieutuongcamxuc" style={$textEmoji} />
          </View>
          <View style={[$viewTitleContent, { height: null }]}>
            <View style={$viewToggle}>
              <TextField
                LeftAccessory={() => (
                  <LeftAccesstory typeIcon="Ionicons" nameIcon="ios-today" colorIcon={colors.primary500} />
                )}
                placeholderTx="thoigian"
                inputWrapperStyle={$wrapInput}
                containerStyle={{ flex: 1 }}
                style={{ ...typography.textBold }}
                placeholderTextColor={colors.neutral900}
                editable={false}
              />
              <Toggle
                variant="switch"
                value={toggleDate}
                onPress={() => setToggleDate(!toggleDate)}
              />
            </View>
            {toggleDate && showToggleDate}
            <View style={$viewToggle}>
              <TextField
                LeftAccessory={() => (
                  <LeftAccesstory typeIcon="Entypo" nameIcon="pin" colorIcon="red" />
                )}
                placeholderTx="ghim"
                inputWrapperStyle={$wrapInput}
                containerStyle={{ flex: 1 }}
                editable={false}
              />
              <Toggle variant="switch" value={togglePin} onPress={() => setTogglePin(!togglePin)} />
            </View>
            <CustomColor />
            <TextField
              value={location}
              LeftAccessory={() => (
                <LeftAccesstory typeIcon="Ionicons" nameIcon="location-sharp" colorIcon="red" />
              )}
              placeholderTx="vitri"
              onChangeText={setLocation}
              inputWrapperStyle={$wrapInput}
              clearButtonMode="while-editing"
            />
            <TextField
              value={url}
              LeftAccessory={() => (
                <LeftAccesstory typeIcon="Entypo" nameIcon="link" colorIcon="red" />
              )}
              placeholder="URL"
              inputWrapperStyle={$wrapInput}
              onChangeText={setUrl}
              clearButtonMode="while-editing"
            />
            {DisplayImage}
          </View>
        </ScrollView>
      </View>
    </Modal>
  )
})

export const LeftAccesstory = ({ typeIcon, nameIcon, colorIcon }: any) => {
  return <VectorsIcon type={typeIcon} name={nameIcon} color={colorIcon} size={20} />
}

const SelectImage = ({ onPressAdd, onPressRemove, dataImages = [], onPressView }: any) => {
  return (
    <View style={$viewRowImg}>
      <VectorsIcon type="Feather" name="image" color="red" size={20} style={{ marginRight: 12 }} />
      {dataImages.length > 0
        ? dataImages.map((el, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={$viewBtnImg}
                activeOpacity={0.8}
                onPress={() => onPressView(index)}
              >
                <TouchableOpacity style={$btnClose} onPress={() => onPressRemove(el)}>
                  <VectorsIcon type="Ionicons" name="md-close-outline" color="white" size={20} />
                </TouchableOpacity>
                <Image
                  source={{
                    uri: el.uri,
                  }}
                  style={$image}
                />
              </TouchableOpacity>
            )
          })
        : null}
      <TouchableOpacity style={[$viewBtnImg, $viewAddImg]} onPress={onPressAdd}>
        <VectorsIcon type="AntDesign" name="plus" color="red" size={20} />
      </TouchableOpacity>
    </View>
  )
}

const CustomColor = ({ colorIcon, onPressSelectCustom, onPressColor }) => {
  const [color, setColor] = useState(1)

  return (
    <View>
      <TextField
        LeftAccessory={() => (
          <LeftAccesstory typeIcon="MaterialIcons" nameIcon="color-lens" colorIcon="red" />
        )}
        placeholderTx="tuychon"
        inputWrapperStyle={$wrapInput}
        containerStyle={{ flex: 1 }}
        style={{ ...typography.textBold }}
        placeholderTextColor={colors.neutral900}
        editable={false}
        onPressIn={onPressSelectCustom}
        RightAccessory={() => (
          <LeftAccesstory
            typeIcon="Feather"
            nameIcon="chevron-right"
            colorIcon={colors.neutral500}
          />
        )}
      />
      <View style={$viewRowColor}>
        {[1, 2, 3, 4, 5, 6].map((el, index) => {
          const $colorSelect =
            color == el
              ? [$viewCircleAtive, { borderColor: "red", borderWidth: 2 }]
              : $viewCircleAtive
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={1}
              onPress={() => {
                onPressColor
                setColor(el)
              }}
              style={$colorSelect}
            >
              <View style={[$viewColor, { backgroundColor: "blue" }]} />
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

const $container: ViewStyle = {
  margin: 0,
  justifyContent: "flex-start",
}
const $viewContainer: ViewStyle = {
  marginTop: 56,
  backgroundColor: colors.neutral100,
  flex: 1,
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  zIndex: 1
}
const $viewTitleContent: ViewStyle = {
  backgroundColor: colors.neutral000,
  paddingHorizontal: 16,
  borderRadius: 8,
  paddingVertical: 12,
  ...configs.shadow,
  marginHorizontal: 16,
  marginTop: 16,
  height: configs.windowHeight / 3,
  zIndex:1
}
const $wrapInput: ViewStyle = {
  borderWidth: 0,
  backgroundColor: colors.neutral000,
  alignItems: "center",
}
const $inputDiary = { fontSize: 16, ...typography.textBold, color: colors.neutral900 }
const $viewToggle: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}
const $viewRowImg: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  flexWrap: "wrap",
}
const $viewBtnImg: ViewStyle = {
  height: 50,
  width: 40,
  marginRight: 16,
  marginTop: 12,
}
const $btnClose: ViewStyle = {
  height: 20,
  width: 20,
  borderRadius: 10,
  backgroundColor: "red",
  position: "absolute",
  top: -8,
  right: -8,
  alignContent: "center",
  justifyContent: "center",
}
const $viewAddImg: ViewStyle = {
  borderWidth: 1,
  borderColor: colors.neutral500,
  justifyContent: "center",
  alignItems: "center",
}
const $image: ImageStyle = {
  height: "100%",
  width: "100%",
  zIndex: -10,
  resizeMode: "cover",
}
const $textEmoji: TextStyle = {
  fontSize: 18,
  textAlign: "center",
}
const $textCustom: TextStyle = {
  fontSize: 14,
  color: colors.neutral900,
}
const $viewRowColor: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-evenly",
  marginVertical: 8,
}
const $viewColor: ViewStyle = {
  height: 18,
  width: 18,
  borderRadius: 10,
}
const $viewCircleAtive: ViewStyle = {
  backgroundColor: colors.neutral000,
  height: 25,
  width: 25,
  borderRadius: 25,
  alignItems: "center",
  justifyContent: "center",
}
